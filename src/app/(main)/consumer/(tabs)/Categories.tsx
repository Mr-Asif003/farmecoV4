
import { FlatList, View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import CategoryHeader from '@/src/components/molecules/categoryHeader';

// import auth from '../../../firebaseConfig'
import { db, auth } from '@/src/app/firebaseConfig';
import { useRouter } from 'expo-router';
import { doc, getDoc } from "firebase/firestore";

//icons
import Entypo from 'react-native-vector-icons/Entypo';
import Octicons from 'react-native-vector-icons/Octicons';

import SelectFruits from '../(productListing)/CPreSelectFruits';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import COrFruitListingPage from '../(orderListing)/COrFruitListingPage';
import { ClipboardList } from 'lucide-react';
import Subsplan from '../(subscription)/Subsplan';

const Categories = () => {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));//to get collection from user i write this code
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

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <CategoryHeader/>
      </View>
      <ScrollView    style={styles.MainContainer}>
        <View style={styles.mainitems}>
          <View style={styles.userNameContainer}>
            <Text style={styles.HiText}>Hi</Text>
            <Text style={styles.userName}>{userName}</Text>
            <Text style={styles.chooseText}>Choose What are your looking for !</Text>
          </View>
          <View style={styles.categoriesContainer}>

            <View style={styles.selectCategoriesContainer} >



              <View style={styles.TopContainer}>

                <View style={styles.sellContainer}>
                  <View style={styles.sell}>

                    <View style={styles.title}><Text style={{ fontSize: 19, fontWeight: '500',color:'black' }}>Order</Text></View>
                    <View style={styles.option}>

                      <TouchableOpacity style={styles.threeDotView} onPress={() => {
                        alert('Click the plus button add your sell your product now')
                      }}>
                        {/* <Entypo name="dots-three-vertical" color="#000" size={24} /> */}
                      </TouchableOpacity>


                      <TouchableOpacity style={styles.buttonView} onPress={() => router.push('../(orderListing)/COrSelectVeg')}>
                        <Octicons name="plus-circle" color="#000" size={24} />
                      </TouchableOpacity>

                    </View>

                  </View>
                </View>
                <View style={styles.iconcontainer}>
                  <Image source={require('../../../../assets/images/category1.jpg')} style={styles.btnImg} />
                </View>

              </View>



              <View style={styles.TopContainer}>

                <View style={styles.sellContainer}>
                  <View style={styles.sell}>

                    <View style={styles.title}><Text style={{ fontSize: 16, fontWeight: '500',color:'black' }}>My Orders</Text></View>
                    <View style={styles.option}>

                      <TouchableOpacity style={styles.threeDotView}>
                        {/* <Entypo name="dots-three-vertical" color="#000" size={24} /> */}
                      </TouchableOpacity>


                      <TouchableOpacity style={styles.buttonView} onPress={() => router.push('../(orderListing)/COrMyProductsVeg')}>
                      <FontAwesome name="list-alt" color="#000" size={24} />
                      </TouchableOpacity>

                    </View>

                  </View>
                </View>
                <View style={styles.iconcontainer}>
                  <Image source={require('../../../../assets/images/category3.jpg')} style={styles.btnImg} />
                </View>

              </View>


              <View style={styles.TopContainer}>

                <View style={styles.sellContainer}>
                  <View style={styles.sell}>

                    <View style={styles.title}><Text style={{ fontSize: 16, fontWeight: '500',color:'black' }}> Pre   order's</Text></View>
                    <View style={styles.option}>

                      <TouchableOpacity style={styles.threeDotView}>

                      </TouchableOpacity>


                      <TouchableOpacity onPress={() => router.push('../(productListing)/CPreSelectVeg')} style={styles.buttonView}>

                      <Octicons name="plus-circle" color="#000" size={24} />

               

                      </TouchableOpacity>

                    </View>

                  </View>
                </View>
                <View style={styles.iconcontainer}>
                  <Image source={require('../../../../assets/images/category2.jpg')} style={styles.btnImg2} />
                </View>

              </View>


              <View style={styles.TopContainer}>

                <View style={styles.sellContainer}>
                  <View style={styles.sell}>

                    <View style={styles.title}><Text style={{ fontSize: 16, fontWeight: '500',color:'black' }}>My         Pre Orders</Text></View>
                    <View style={styles.option}>

                      <TouchableOpacity style={styles.threeDotView}>
                        {/* <Entypo name="dots-three-vertical" color="#000" size={24} /> */}
                      </TouchableOpacity>


                      <TouchableOpacity style={styles.buttonView} onPress={()=>router.push('../(productListing)/CPreMyProductsVeg')}>
                      <FontAwesome name="list-alt" color="#000" size={24} />
                      </TouchableOpacity>

                    </View>

                  </View>
                </View>
                <View style={styles.iconcontainer}>
                <Image source={require('../../../../assets/images/category3.jpg')} style={styles.btnImg}/>
                </View>

              </View>

              <View style={styles.TopContainer}>

                <View style={styles.sellContainer}>
                  <View style={styles.sell}>

                    <View style={styles.title}><Text style={{ fontSize: 13, fontWeight: '500',color:'black',marginLeft:-2 }}>Subscription</Text>
                    <Text style={{ fontSize: 15, fontWeight: '500',color:'black' }}>Farming</Text>
                    
                    </View>
                    
                    <View style={styles.option}>

                      <TouchableOpacity style={styles.threeDotView}>
                        {/* <Entypo name="dots-three-vertical" color="#000" size={24} /> */}
                      </TouchableOpacity>


                      <TouchableOpacity style={styles.buttonView} onPress={()=>{router.push('../(subscription)/Subsplan')}}>
                      <Octicons name="plus-circle" color="#000" size={24} />
                      </TouchableOpacity>

                    </View>

                  </View>
                </View>
                <View style={styles.iconcontainer}>
                <Image source={require('../../../../assets/images/introman3.png')} style={styles.btnImg3} />
                </View>

              </View>

              <View style={styles.TopContainer}>

                <View style={styles.sellContainer}>
                  <View style={[styles.sell,styles.down]}>

                    <View style={styles.title}><Text style={{ fontSize: 13, fontWeight: '500',color:'black',marginLeft:-2 }}>Subscriotion</Text>
                   < Text style={{ fontSize: 15, fontWeight: '500',color:'black' }}>History</Text></View>
                    <View style={styles.option}>

                      <TouchableOpacity style={styles.threeDotView}>
                        {/* <Entypo name="dots-three-vertical" color="#000" size={24} /> */}
                      </TouchableOpacity>


                      <TouchableOpacity style={styles.buttonView}>
                      <FontAwesome name="history" color="#000" size={24} />
                      </TouchableOpacity>

                    </View>

                  </View>
                </View>
                <View style={styles.iconcontainer}>
                <Image source={require('../../../../assets/images/introman1.png')} style={styles.btnImg3} />
                </View>

              </View>
              









            </View>
          </View>
        </View>
      </ScrollView>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    backgroundColor: '#28Ac60'
  },
  headerContainer: {
    height: '14%',
  },
  MainContainer: {
    display: 'flex',
    height: 2200,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 100, height: 100 },
    shadowOpacity: 1,
    shadowRadius: 2,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    elevation: 10,
    margin:0,
    marginBottom: 0,
    marginTop:20


  },
  mainitems: {
    flex: 1,
    margin:1,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginBottom: 0,
    display: 'flex',
    flexDirection: 'column',
    elevation: 3,
    padding:10
  },
  userNameContainer: {

  },
  chooseText: {
fontSize:20,
  fontWeight:'500'
  },
  HiText: {
  fontSize:25,
  fontWeight:'400'
  },
  userName: {
fontSize:25,
  fontWeight:'600'
  },
  categoriesContainer: {

    flex: 1,
    display: 'flex',
   

  },
  selectCategoriesContainer: {
    height: '110%',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:-30
  },
  TopContainer: {
   height:190,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin:10,
    marginBottom:20,
    marginTop:20,
    marginLeft:20
  },

  sellContainer: {
    marginBottom:-190,
    height: 140,
    width: 130,
    backgroundColor: '#28AC60',
  
    borderRadius: 30,
    padding: 5,
    opacity:0.8,
    
  },
  sell: {
    height: '100%',
    width: '100%',
    flex: 1,

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
marginBottom:2

  },
  presell: {

  },
  upcomingDelivries: {

  },
  buttonView: {
    display: 'flex',
    height: 35,
    width: 60,
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    elevation: 5,
    shadowOffset: { height: 50, width: 20 },
    shadowOpacity: 10,
  },
  option: {
    display: 'flex',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: '30%'
  },
  title: {
    height: '100%',
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titletext: {
    fontSize: 30,
    fontWeight: '600',

  },
  threeDotView: {
    padding: 5,
    marginTop: 4
  },
  iconcontainer: {

    height: 85,
    backgroundColor: '#f0fff1',
    width: 93,
    borderRadius: 50,
    padding: 6,
    elevation: 9,
    shadowOffset: { height: 40, width: 8 },
    shadowOpacity: 0.9,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

  },
  btnImg: {
    position: 'absolute',
    height: 90,
    width: 100,
    borderRadius: 100,
  },
  btnImg2: {
    position: 'absolute',
    height: 70,
    width: 80,
    borderRadius: 100,
  },
  down:{
    
  },
  btnImg3: {
    position: 'absolute',
    height: 80,
    width: 50,
    borderRadius: 100,
  
  },






})

export default Categories;

{/* <View style={styles.sell}>

<View style={styles.title}><Text style={styles.titletext}>Sell</Text></View>
<View style={styles.option}>

  <TouchableOpacity style={styles.threeDotView}>
    <Entypo name="dots-three-vertical" color="#000" size={24} />
  </TouchableOpacity>


  <TouchableOpacity style={styles.buttonView}>

  </TouchableOpacity>

</View>

<<<<<<< HEAD
</View> */}

