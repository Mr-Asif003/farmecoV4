import { View, Text, StyleSheet, ImageBackground, Image, TextInput, Touchable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import imageC from '../../../../assets/images/imageC'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaFrame } from 'react-native-safe-area-context';


//dB

import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { db, auth } from '@/src/app/firebaseConfig';
import SelectVeg from './COrSelectVeg';


const COrListingPage = ({ }: { title: string, id: 'string' }) => {

    const router = useRouter()
    const { itemId, itemRate, itemtitle } = useLocalSearchParams();
   
   
    const [description, setDescription] = useState('')
    const [title, setTitle] = useState('')
    const [id, setId] = useState('')
    const [Quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [dod, setDod] = useState('');
    const [state, setState] = useState('');
    const [phone, setPhone] = useState('');
    const [pinCode, setPinCode] = useState('');
    const [address, setAddress] = useState('');
    const [Rating,setRating]=useState('');
    const floatprice = parseFloat(price);
    const floatquantity = parseFloat(Quantity);
    const total = floatprice * floatquantity;


    //add crops ...
    const addProduct = async () => {
        if(Quantity===''||price===''||dod==''||state==''||pinCode===''||address===''){
            alert('All Fields are required.');
            return
        }

        try {



            const user = auth.currentUser;
            if (!user) {
                console.log('no authenticated user')
            }

            const cropData = {
                Status:'Order Veg',
                Pid: itemId,
                Name: itemtitle,
                Description: description,
                Quantity: Quantity,
                Rating:Rating,
                Price: price,
                Dod: dod,
                State: state,
                Phone: phone,
                Pincode: pinCode,
                Address: address,
                TotalDemandingPrice: total,
                listedBy: user.uid,
                listedAt: new Date(),
            }
            // Adding crop data to the user's collection
            const userRef = doc(db, "users", user.uid);
            await addDoc(collection(userRef, 'Order'), cropData);

            //adding to FarmerProducts db;
            await addDoc(collection(db, "ConsumerOrder"), cropData);
            alert('Crop Listed Successfully !');


            setAddress('');
            setDescription('');
            setDod('');
            setPhone('');
            setPinCode('');
            setState('');
            setQuantity('');
            setPrice('');
            router.replace('./COrMyProductsVeg');

        } catch (error) {
            alert("Error in Listing Crop" + error.message)
        }



    }

    //select option
   





    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <View style={{ display: 'flex', flexDirection: 'row' }}>

                    <Image source={require('../../../../assets/images/vegtables.png')} style={styles.image}></Image>
                    <View style={{ marginTop: 10 }}>

                    <Text style={{ fontSize: 27, fontWeight: '700', marginTop: 1,marginLeft:-2 }}>  Order </Text>

                        <Text style={{ fontSize: 17, fontWeight: '400', marginTop: 1,marginLeft:-2 }}> Vegetable id = {itemId}</Text>


                        
                    </View>
                </View>

                <View style={styles.title}>
                    <Text style={styles.titleTxt}>{itemtitle}</Text>
                    <Text style={{ fontSize: 14, fontWeight: '400', marginTop: 0, marginLeft: -50 }}> {itemtitle} market rate is  = {itemRate}</Text>
                    </View>
            </View>



            <View style={styles.bottomContainer}>
                <TextInput
                    placeholder='Describe About Your Product'
                    multiline={true}
                    numberOfLines={4}
                    value={description}
                    onChangeText={setDescription}
                    style={styles.txtInput} />


<View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>   
                <View style={{ marginTop: 5 }}>
                    <Text style={{ fontSize: 14, fontWeight: '500' }}>Quantity in KG</Text>
                    <TextInput
                        value={Quantity}
                        onChangeText={setQuantity}
                        placeholder='Quantity in Kg' style={{ backgroundColor: '#BDE7CF', borderRadius: 20, height: 45, width: 230, marginTop: 1, fontSize: 17, paddingLeft: 10 }} />
                </View>
                <View style={{ marginTop: 5, marginLeft: 20 }}>
                        <Text style={{ fontSize: 14, fontWeight: '500', marginLeft: 1 }}>Rating /10</Text>
                        <TextInput
                            value={Rating}
                            onChangeText={setRating}

                            placeholder='Grade out of 10' style={{ backgroundColor: '#BDE7CF', borderRadius: 20, height: 45, width: 120, marginTop: 1, fontSize: 15, paddingLeft: 10 }} />
                    </View>

                </View>


                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ marginTop: 5 }}>
                        <Text style={{ fontSize: 14, fontWeight: '500' }}>Price Per KG</Text>
                        <TextInput
                            value={price}
                            onChangeText={setPrice}
                            placeholder='Demanding Price Per Kg' style={{ backgroundColor: '#BDE7CF', borderRadius: 20, height: 45, width: 170, marginTop: 1, fontSize: 15, paddingLeft: 10 }} />
                    </View>

                    <View style={{ marginTop: 5, marginLeft: 20 }}>
                        <Text style={{ fontSize: 14, fontWeight: '500', marginLeft: 10 }}>Date of Delivery</Text>
                        <TextInput
                        
                            value={dod}
                            onChangeText={setDod}
                            
                            placeholder='Date' style={{ backgroundColor: '#BDE7CF', borderRadius: 20, height: 45, width: 170, marginTop: 1, fontSize: 15, paddingLeft: 10 }} />
                    </View>
                </View>


                <View style={{ marginTop: 5 }}>
                    <Text style={{ fontSize: 14, fontWeight: '500' }}>State</Text>
                    <TextInput
                    autoCapitalize="characters"
                        value={state}
                        onChangeText={setState}
                        placeholder='State' style={{ backgroundColor: '#BDE7CF', borderRadius: 20, height: 45, width: 370, marginTop: 1, fontSize: 15, paddingLeft: 10 }} />
                </View>



                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ marginTop: 7 }}>
                        <Text style={{ fontSize: 14, fontWeight: '500' }}>Phone number</Text>
                        <TextInput
                            value={phone}
                            onChangeText={setPhone}
                            placeholder='Phone Number' style={{ backgroundColor: '#BDE7CF', borderRadius: 20, height: 45, width: 200, marginTop: 1, fontSize: 15, paddingLeft: 10 }} />
                    </View>


                    <View style={{ marginTop: 7, marginLeft: 20 }}>
                        <Text style={{ fontSize: 14, fontWeight: '500' }}>Pin Code</Text>
                        <TextInput
                            value={pinCode}
                            onChangeText={setPinCode}
                            placeholder='Pin Code' style={{ backgroundColor: '#BDE7CF', borderRadius: 20, height: 45, width: 130, marginTop: 1, fontSize: 15, paddingLeft: 10 }} />
                    </View>
                </View>
                <View style={{ marginTop: 7, }}>
                    <Text style={{ fontSize: 14, fontWeight: '500' }}>Address</Text>
                    <TextInput
                        value={address}
                        onChangeText={setAddress}
                        numberOfLines={3} multiline={true}
                        placeholder='Address' style={{ backgroundColor: '#BDE7CF', borderRadius: 20, height: 55, width: 350, marginTop: 1, fontSize: 20, paddingLeft: 10 }} />
                </View>
                <Text style={{ fontSize: 14, fontWeight: '600', marginTop: 10 }}>Total Rupees :- {total}</Text>

                <TouchableOpacity style={styles.addbtn} onPress={addProduct}>
                    <Text style={{ fontSize: 25, color: 'white', fontWeight: '500' }}> ADD </Text>
                </TouchableOpacity>







                <TouchableOpacity style={styles.stackIcon} onPress={() => router.replace('./COrSelectVeg')}>
                    <AntDesign name="leftsquare" color="green" size={44} />
                </TouchableOpacity >
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        height:'100%',
        width:'100%',
        position:'relative'
    },
    topContainer: {
        
        height: 140,
        width:'100%',
        backgroundColor: '#89fc00'
    },
    bottomContainer: {
        
        marginTop:'17%',
        width:'99%',
        height: 700,
        display: 'flex',
        alignItems: 'flex-start',
        padding: 10,
    },
    image: {
        height:'350%',
        width: '70%',
        borderRadius: 200,
        marginTop:'-13%',
        marginLeft: '-15%'
    },
    title: {
        marginLeft: "60%",
        marginTop: 70,
        height:50
        
    },
    titleTxt: {
        fontSize: 25,
        fontWeight: '600'
    },
    txtInput: {
        backgroundColor: '#BDE7CF',
        height: '10%',
        width:'95%',
        borderRadius: 20,
        fontSize: 18,
    },
    addbtn: {
        height: 50,
        backgroundColor: '#28AC60',
        width:'30%',
        borderRadius: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
        marginTop: 10,
        marginLeft: 230,
    },
    stackIcon: {
        height: 50,
        
        marginBottom: 5,
        marginTop: -43
    },
    headerText: {
        fontSize: 16,
        marginBottom: 2,
        marginLeft:4,
        marginTop:1,
    },
    radioContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 160,
        marginLeft:4
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 2,
    },
    outerCircle: {
        height: 24,
        width: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#6200ee',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    innerCircle: {
        height: 12,
        width: 12,
        borderRadius: 6,
        backgroundColor: '#6200ee',
    },
    radioLabel: {
        fontSize: 16,
        color: '#333',
    },
    selectedText: {
        marginTop: 2,
        fontSize: 16,
        color: '#333',
        marginLeft:-30
    },
    

})
export default COrListingPage