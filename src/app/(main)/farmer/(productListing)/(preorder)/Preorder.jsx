import { FlatList, View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Container } from 'lucide-react-native'

import TabBarOption from '@/src/components/molecules/TabBarOption';
// import auth from '../../../firebaseConfig'
import { db, auth } from '@/src/app/firebaseConfig';

import { doc, getDoc } from "firebase/firestore";
import { trendingProducts, seasonalProducts, closureImgs } from '../../fdb/trendingProduct'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useRouter, useLocalSearchParams } from 'expo-router';

import MyProductTabBarOptions from '@/src/components/molecules/MyProductsTabBar';
import { collection, query, where, onSnapshot ,getDocs} from "firebase/firestore";
import AcceptedPreOrder from './AcceptedFruitPreoder'





const Preorder = () => {
  const navigation = useNavigation()
  const router = useRouter()
  //extracting name
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'ConsumerPreorder'));//to get collection from user i write this code
          if (userDoc.exists()) {
            const userData = userDoc.data();//to get data from user i write this code
            setUserName(userData.name || "User"); // Fallback to "User" if name is not set
          } else {
            console.warn("User data not found in Firestore.");
          }
        } catch (error) {
          console.error("Error fetching user data:", error.message);
        }
      } else {
        console.warn("No authenticated user.");
      }
      setIsLoading(false);
    };

    fetchUserData();
  }, []);


  //database extracting all products
  const [userProducts, setUserProducts] = useState([]);
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      alert("User not authenticated");
      return;
    }

    const userProductsRef = collection(db, "users", user.uid, "crops");
    const q = query(userProductsRef);

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const products = [];
      querySnapshot.forEach((doc) => {
        products.push({ id: doc.id, ...doc.data() });
      });
      setUserProducts(products);
      console.log(userProducts)
    });

    return () => unsubscribe();
  }, []);




  const renderItem= ({ item,index }) => (
    <View style={[styles.card, (index) % 3 === 0 ? styles.evenCard : styles.oddCard]}>
      
    <View>
      <Text>Product id :- {item.Pid}</Text>
    </View>

    <View style={{ marginLeft: 10, display: 'flex', flexDirection: 'row', marginBottom: 1, marginTop: 10 }}>
      <View style={{ height: 100, width: 100, }}>
        <Image style={{ height: 100, width: 100, borderRadius: 10 }} source={require('../../../../../assets/images/vegtables.png')} />
      </View>

      <View style={{ marginLeft: 10 ,marginBottom:2 }}>
        <Text style={styles.productName}>{item.Name}</Text>

        <View style={{ marginLeft: 10 }}>
        <Text style={{ fontSize: 12, fontWeight: '500' }}>Price:- Rs. {item.Price}</Text>
          <Text style={{ fontSize: 12, fontWeight: '500' }}>Quantity:-{item.Quantity} </Text>
          <Text style={{ fontSize: 12, fontWeight: '500' }}>DOD:- {item.Dod}</Text>
          <Text style={{ fontSize: 15, fontWeight: '500',marginLeft:-120, marginTop:20,}}>State :-{item.State}</Text>

        </View>
        <TouchableOpacity style={styles.viewDetails} onPress={()=>router.push("./Pdetails")}><Text style={{ fontSize: 15, }}>View Details</Text></TouchableOpacity>
      </View>
    </View>





    {/* {item.cropImage && (
    <Image source={{ uri: item.cropImage }} style={styles.image} />
    )} */}

  </View>
  )

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.openDrawer()} // Opens the right-side drawer
        >
          <FontAwesome name="align-left" color="#000" size={24} />
        </TouchableOpacity>
        <View>
          <View><Text style={styles.hello}> Hello {userName}</Text></View>
        </View>
        <Text style={{ fontSize: 25, fontWeight: '600',marginLeft:5 }}>Vegetable PreOrders </Text>

      </View>
      <View style={styles.tranButton}>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.vegbtn}  ><Text style={styles.vegtxt} >Vegetables</Text></TouchableOpacity>
          <TouchableOpacity style={styles.fruitbtn} onPress={() => router.replace('./fruitPreorder')}  ><Text style={styles.fruittxt} >Fruits</Text></TouchableOpacity>
        </View>
      </View>

      {/* tabbar */}
      <ScrollView>

        <View style={styles.tabBar}>
          <MyProductTabBarOptions />

        </View>


        {/* mainContainer............ */}
        <View style={styles.mainContainer}>

          <View style={styles.Listcontainer}>
            
            {userProducts.length === 0 ? (
              <Text style={styles.noDataText}>No products found</Text>
            ) : (
              <FlatList
              data={userProducts}
              keyExtractor={(item) => item.id}
                renderItem={renderItem}
              />
            )}
          </View>


        </View>
      </ScrollView>
      <View style={styles.bottomNav}>
        <TouchableOpacity   style={styles.PreOrder}><Text style={{fontSize:21,fontWeight:'600',color:'green'}}        >PreOrders</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=>{router.replace("./AcceptedPreorder") }}   style={styles.Accept} ><Text   >Accepted</Text></TouchableOpacity>
      </View>
    </View>
  );


}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white'
  },
  header: {
    backgroundColor: '#28AC60',
    height: 120,
    paddingLeft:7
  },
  tabBar: {
    height: 75,
  },


  mainContainer: {

  },
  button: {
    padding: 5,
    marginTop: 10,
    borderRadius: 5,
    marginLeft: 10
  },
  hello: {
    fontSize: 20,
    fontWeight: '500'
  },
  welcome: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '400'
  },
  tranButton: {
    backgroundColor: '#28AC60',
    marginBottom: 10,
    padding: 5
  },
  vegbtn: {
    height: 35,
    width: '50%',
    backgroundColor: 'green',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',


    borderRadius: 20,
    elevation: 10

  },
  fruitbtn: {
    height: 34.5,
    width: '50%',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

  },
  fruittxt: {
    fontSize: 17,
    fontWeight: '400'
  },
  vegtxt: {
    fontSize: 20,
    fontWeight: '500',
    color: 'white'
  },
  btnContainer: {
    height: 34,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#b7efc5',
    borderRadius: 20,
    marginHorizontal: 10,

  },
  Listcontainer: {
    flex: 1,
    padding:0,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  noDataText: {
    textAlign: "center",
    fontSize: 16,
    color: "#888",
  },
  productItem: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    elevation: 10,
  },
  productName: {
    marginTop: 5,
    fontSize: 25,
    fontWeight: "bold",
    textalign: 'center'
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
  bottomNav:{
    height:70,
    width:"100%",
    
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center'
  },
  Accept:{
  
    height:50,
    width:'40%',
    backgroundColor:'white',
    borderRadius:20,
    elevation:6,
     justifyContent:'center',
    alignItems:'center'

  },
  PreOrder:{
   

    height:50,
    width:'40%',
    backgroundColor:'white',
    borderRadius:20,
    elevation:6,
    justifyContent:'center',
    alignItems:'center'
  },

  card:{
    elevation: 2, borderRadius: 20, backgroundColor: '#f0fff1', marginTop: 10, padding: 10, margin: 8 
  },
  evenCard: {
    backgroundColor: '#f0fff1', // Background for even-indexed items
  },
  oddCard: {
    backgroundColor: '#F3E3B0', // Background for odd-indexed items
  },
  viewDetails: {
    height: 40,
    width: 100,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 2,
    marginLeft: '40%',
    marginTop: -30
  },




})

export default Preorder;
