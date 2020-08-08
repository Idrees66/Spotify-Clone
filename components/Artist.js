import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image} from 'react-native';
// import { Image } from 'react-native-elements';


const Artist = ({singer}) =>{
    if (!singer) return null;
    const {name, genres, followers,images} = singer;

    return(

        <View style={styles.container}>
            <View style={styles.Bio}>
            <Text style={[styles.text,
                 {color: 'rgba(185, 18, 118,0.6)',
                  fontWeight:'bold',
                  borderBottomWidth: 2,
                  borderColor:'rgba(185, 18, 118,0.4)',
                  paddingBottom:10,
                  fontSize:20,
                  
                }]}
                  >{name}</Text>
            <Text style={[styles.text, {fontStyle:'italic', color: 'gray',  fontSize:18,padding: 10, color:'rgb(202, 150, 16)'}]}>{followers.total} Followers</Text>
            <Text style={[styles.text, {fontStyle:'italic', color: 'gray',  fontSize:16}]}>{genres.join(" , ")}</Text>
            </View>
            {/* <View style={{ elevation:10,}}> */}
            <Image style={styles.image} source={{ uri : images[0].url}}   resizeMode='contain' />
            {/* source={require('../assets/splash.png')} */}
        </View>

    );
    
}

export default Artist;

const styles = StyleSheet.create({
    container : {
        // flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: 'white',
        padding:20,
        margin:10,
        // overflow:'hidden',
        flexDirection: 'row',
        elevation:10,
        // borderTopRightRadius:40,
        // borderBottomLeftRadius:40,
        borderTopLeftRadius:60,
        borderBottomRightRadius:80
    },
    text:{
       
    },
    image: {
        width: 150,
        height:150,
        marginVertical:10,
        borderTopLeftRadius:100,
        borderBottomRightRadius:100,
        
    },
    Bio :{
        flex:1,
        alignItems:'center'
    }
});