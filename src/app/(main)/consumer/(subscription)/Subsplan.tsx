import { View, Text, StyleSheet, ImageBackground, Image, ScrollView } from 'react-native'
import React from 'react'

import { TouchableOpacity } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { useRouter } from 'expo-router';

const Subsplan = () => {
    const router = useRouter()
    return (
        <View style={styles.container}>
            <View style={styles.topcontainer}>
                <View >
                    <TouchableOpacity style={styles.stackIcon} onPress={() => router.replace('../(tabs)/Categories')}>
                        <AntDesign name="leftsquare" color="green" size={35} />
                    </TouchableOpacity >
                </View>
                <View style={{ height: '100%' }}>

                    <Image source={require('../../../../assets/images/subs1.png')} style={{ height: '70%', width: '70%', marginTop: '30%', marginLeft: '12%', }} />



                    <View style={{ height: 200 }}>
                        <Image source={require('../../../../assets/images/ba.png')} style={{ height: '0%', resizeMode: 'cover', width: '0%', marginLeft: -50, marginTop: '-90%' }} />

                    </View>
                </View>



            </View>





            <ScrollView horizontal style={{height:'60%',width:'100%',padding:20}}>
            <View style={styles.card} >
                        <Text style={{fontSize:39,fontWeight:'700'}}>Monthly Plan</Text>
                        <View style={{display:'flex',flexDirection:'row',marginTop:'2',justifyContent:'center',alignItems:'center'}}>
                        <AntDesign name="checkcircleo" color="green" size={14} />
                            <Text style={{marginLeft:10}}>Flexible Quantity Options</Text>
                        </View>
                        <View style={{display:'flex',flexDirection:'row',marginTop:'2',justifyContent:'center',alignItems:'center'}}>
                        <AntDesign name="checkcircleo" color="green" size={14} />
                            <Text style={{marginLeft:10}}>Flexible Quantity Options</Text>
                        </View>
                        <View style={{display:'flex',flexDirection:'row',marginTop:'2',justifyContent:'center',alignItems:'center'}}>
                        <AntDesign name="checkcircleo" color="green" size={14} />
                            <Text style={{marginLeft:10}}>Flexible Quantity Options</Text>
                        </View>
                        <View style={{display:'flex',flexDirection:'row',marginTop:'2',justifyContent:'center',alignItems:'center'}}>
                        <AntDesign name="checkcircleo" color="green" size={14} />
                            <Text style={{marginLeft:10}}>Flexible Quantity Options</Text>
                        </View>
                    </View>










                    
            </ScrollView>
            <View>
                <Text>Rs.XXXX/month</Text>
                <TouchableOpacity style={styles.subbtn}><Text style={{color:'white'}}>Subscribe</Text></TouchableOpacity>
            </View>
            <TouchableOpacity style={{marginBottom:20}} onPress={() => router.replace('./Subsplandaily')}>
            <Entypo name="chevron-with-circle-right" color="green" size={34} />
                    </TouchableOpacity >
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        height: '100%',
        width: '100%',
        justifyContent:'center',
        alignItems:'center',
    },
    topcontainer: {
        height: '40%',
        width: '100%',
    },
    bottomContainer: {
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
       
        padding:20
    },
    stackIcon: {
        height: 50,
        marginBottom: 5,
        margin:9,
    },
    card:{
        height:'70%',width:'120%' ,justifyContent:'center',alignItems:'center',
        backgroundColor:'white',
        borderRadius:20, marginLeft:10,
        marginTop:80,
    },
    subbtn:{
        height:50,
        width:100,
        backgroundColor:'green',
        borderRadius:10,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginBottom:15
    }
})
export default Subsplan