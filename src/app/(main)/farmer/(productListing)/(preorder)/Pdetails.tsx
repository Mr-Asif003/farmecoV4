import { View, Text,StyleSheet,TouchableOpacity } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';

import { useRouter, useLocalSearchParams } from 'expo-router';

const Pdetails = () => {
   
    const router = useRouter()
    const { itemId, itemRate, itemtitle } = useLocalSearchParams();
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
      <TouchableOpacity style={{margin:8}} onPress={() => router.replace('./Preorder')}>
                    <AntDesign name="leftsquare" color="#28AC60" size={34} />
                </TouchableOpacity >
                <Text style={{fontWeight:'600',fontSize:35,marginLeft:10}}> Order Details</Text>
      </View>
      <View style={styles.bottomContainer}>
        <Text style={{fontSize:23}}>Order Id :- </Text>
        
        <View style={styles.details}>
        <Text style={{fontSize:18 ,fontWeight:'400',color:'white',height:40,justifyContent:'center'}}>Product Name :- </Text>
        <Text style={{fontSize:18,fontWeight:'400',color:'white',height:40,justifyContent:'center'}}>Price :- </Text>
        <Text style={{fontSize:18 ,fontWeight:'400',color:'white',height:40,justifyContent:'center'}}>Pincode :- </Text>
      
        
        </View>
      
      <View style={{backgroundColor:'#28AC60',width:'200',marginTop:30,borderRadius:10,height:40,justifyContent:'center'}}>
      <Text style={{fontSize:18,fontWeight:'400',color:'white',}}>State :- </Text>
      </View>
      <View style={{backgroundColor:'#28AC60',width:'200',marginTop:5,borderRadius:10,height:40,justifyContent:'center'}}>
      <Text style={{fontSize:18,fontWeight:'400',color:'white',height:40,justifyContent:'center'}}>Address :- </Text>
      </View>





      <View style={{backgroundColor:'#28AC60',width:'300',marginTop:30,borderRadius:10,marginLeft:100,height:40,justifyContent:'center'}}>
      <Text style={{fontSize:15,fontWeight:'400',color:'white'}}>Order Placed :- </Text>
      </View>
      <View style={{backgroundColor:'#28AC60',width:'300',marginTop:5,borderRadius:10,marginLeft:100,height:40,justifyContent:'center'}}>
      <Text style={{fontSize:15,fontWeight:'400',color:'white'}}>Date Of Delivery :- </Text>
      </View>


      <View style={{backgroundColor:'#28AC60',width:300,marginTop:5,borderRadius:200,marginLeft:100,height:300,}}>
      <View style={{margin:50}}>
        <Text style={{fontSize:16,fontWeight:'600'}}>Remaining Days </Text>
        <Text style={{fontSize:16,marginLeft:19}}>to Fullfill Order:- </Text>
        <Text style={{fontSize:36,marginLeft:19}}>25 Days</Text>

      </View>
      <View style={{backgroundColor:'white',width:100,marginTop:-31,borderRadius:10,marginLeft:90,height:50,justifyContent:'center',alignItems:'center',elevation:2}}>
      <Text style={{fontSize:15,fontWeight:'700',color:'#28AC60',}}>Accept order </Text>
      </View>
      </View>
     



      </View>
    </View>
  )
}

const styles=StyleSheet.create({
    container:{
        display:'flex',
        height:'100%',
        width:'100%',
        position:'relative',
    },
    topContainer:{
        height:'16%',
        width:'100%',
       
        

    },
    bottomContainer:{
        height:'70%',
        width:'100%',
        marginLeft:10,
    },
    details:{
        marginTop:10,
        backgroundColor:'#28AC60',
        borderRadius:10,
        width:'90%',
        marginHorizontal:10,
        padding:10
    }
})

export default Pdetails