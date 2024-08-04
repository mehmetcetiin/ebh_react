import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';

export default function Table() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [expandedProductId, setExpandedProductId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchProducts();
  }, [searchQuery]); // searchQuery değiştiğinde fetchProducts fonksiyonunu çağır
  
  useEffect(() => {
    fetchProducts();
  }, [page]); 


  const fetchProducts = async () => {
    let endpoint = 'https://dummyjson.com/products';
    if (searchQuery) {
      endpoint += `/search?q=${searchQuery}`;
    } else {
      endpoint += `?limit=5&skip=${(page - 1) * 5}`;
      
    }
    console.log('Endpoint:', endpoint);
  
    try {
      const response = await axios.get(endpoint);
      setProducts(response.data.products);
      const totalProducts = response.data.total;
      setTotalPages(Math.ceil(totalProducts / 5));
    } catch (error) {
      console.error('Ürünleri çekerken hata oluştu:', error);
    }
  };


  const handleProductPress = (productId) => {
    setExpandedProductId(expandedProductId === productId ? null : productId);
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setPage(pageNumber);
    }
  };

  const renderItem = ({ item }) => (
    <View>
      <TouchableOpacity onPress={() => handleProductPress(item.id)} style={styles.productContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Image source={{ uri: item.thumbnail }} style={styles.image} />
      </TouchableOpacity>
      {expandedProductId === item.id && (
        <View style={styles.detailsContainer}>
          <Text>Açıklama: {item.description}</Text>
          <Text>Marka: {item.brand}</Text>
          {item.images.map((image, index) => (
            <Image key={index} source={{ uri: image }} style={styles.detailImage} />
          ))}
        </View>
      )}
    </View>
  );

  const renderPagination = () => {
    const pageButtons = [];
    const maxPagesToShow = 3;
    let startPage = Math.max(1, page - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    if (startPage > 1) {
      pageButtons.push(
        <TouchableOpacity key="1" style={styles.pageButton} onPress={() => handlePageChange(1)}>
          <Text style={styles.pageButtonText}>1</Text>
        </TouchableOpacity>
      );
      if (startPage > 2) {
        pageButtons.push(
          <Text key="dots-start" style={styles.dots}>...</Text>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <TouchableOpacity
          key={i}
          style={[styles.pageButton, { backgroundColor: page === i ? '#16247d' : '#ccc' }]}
          onPress={() => handlePageChange(i)}
        >
          <Text style={styles.pageButtonText}>{i}</Text>
        </TouchableOpacity>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageButtons.push(
          <Text key="dots-end" style={styles.dots}>...</Text>
        );
      }
      pageButtons.push(
        <TouchableOpacity key={totalPages} style={styles.pageButton} onPress={() => handlePageChange(totalPages)}>
          <Text style={styles.pageButtonText}>{totalPages}</Text>
        </TouchableOpacity>
      );
    }

    return (
      <View style={styles.paginationContainer}>
        <TouchableOpacity
          style={styles.navigationButton}
          onPress={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          <Text style={styles.pageButtonText}>Önceki</Text>
        </TouchableOpacity>
        {pageButtons}
        <TouchableOpacity
          style={styles.navigationButton}
          onPress={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
        >
          <Text style={styles.pageButtonText}>Sonraki</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Ürünler</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Ürün ara..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredProducts}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
      {/* Arama sonuçları geldiğinde pagination'ı gösterme */}
      {!searchQuery && renderPagination()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 80,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    elevation: 2,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  detailsContainer: {
    padding: 10,
    backgroundColor: '#e9e9e9',
    borderRadius: 10,
    marginVertical: 10,
  },
  detailImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginVertical: 5,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 100,
  },
  pageButton: {
    marginHorizontal: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
  },
  pageButtonText: {
    color: '#fff',
  },
  navigationButton: {
    marginHorizontal: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#16247d',
  },
  dots: {
    marginHorizontal: 5,
    color: '#000',
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

