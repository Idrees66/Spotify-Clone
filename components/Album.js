import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions,FlatList, Image, TouchableOpacity } from 'react-native'
// import { ScrollView } from 'react-native';

// import SoundPlayer from 'react-native-sound-player';
// import reactNativeSoundPlayer from 'react-native-sound-player';
// import Sound from 'react-native-sound';
// const Sound = require("react-native-sound"); 
import { Audio } from 'expo-av';

export default class Album extends Component {

    state = {
        isPlaying : false,
        song : null,
        playingUrl : null
    }
    
playAudio=(purl)=> async() =>{
    console.log("Audio loaded")

    const soundObject = new Audio.Sound();

    if (!this.state.isPlaying){

        try {
            await soundObject.loadAsync({uri : purl});
            await soundObject.playAsync();
            // Your sound is playing!
          
            } catch (error) {
            // An error occurred!
            }
        // audio.play();
        this.setState({isPlaying : true, song: soundObject, playingUrl: purl });
    }
    else{
        try{
            this.state.song.stopAsync();
        }catch (error) {
            // An error occurred!
            }
      
      //  this.state.song.pause();
        this.setState({isPlaying : false});
    }

}


trackIcon =(track)=>{
    // console.log("flag Track")
    if(!track.preview_url){
        return  <Text style={{fontSize:25}}>N/A</Text>;
    }
    if(this.state.isPlaying && track.preview_url === this.state.playingUrl){
        return  <Text style={{fontWeight:'bold'}} >||</Text>;
    }
    else{
        return <Text>&#9654;</Text>;
    }
}


    renderItem = ({item})=>{
        const {id, name ,album, preview_url} = item;
  
        return(
            // onPress={this.playAudio(preview_url)}
            <View style={styles.albumItem}>
                <Text style={styles.nameText}> {name} </Text>
                <TouchableOpacity onPress={this.playAudio(preview_url)} >
                <Image source={{uri : album.images[0].url}}  style={styles.image}   resizeMode='contain'  />
                <View style={styles.trackCon} >
                <Text style={styles.trackIcon} >{this.trackIcon(item)}</Text>
                </View>
                </TouchableOpacity>
            
               
            </View>
      
        )}

        ItemSeparatorComponent = ()=>(
            <View style={{ height:10}} ></View>
        )

    render() {
        const {album} = this.props;
        // console.log("Album Flag : ",album)
        return (

                <View style={styles.flatList} >
                     {/* <Text>Hello</Text> */}
                     {/* <ScrollView horizontal={true}> */}
                    <FlatList
                        data = {album}
                        renderItem = {this.renderItem}
                        keyExtractor = {(item,id)=> id.toString()}
                        ItemSeparatorComponent={this.ItemSeparatorComponent}
                        // showsVerticalScrollIndicator={false}
                        alwaysBounceHorizontal
                        // numColumns={2}
                    />
                {/* </ScrollView> */}
                   
                </View>

        )
    }
}

const w = Dimensions.get("screen").width;
const styles = StyleSheet.create({
    flatList: {
        flex:1,
        marginTop:10,
        width: w-25,
        marginBottom:90,
       
        // backgroundColor:'beige',
        // flexDirection:'row'
      },
    albumItem: {
        backgroundColor:'white',
        // backgroundColor : 'rgba(185, 18, 118,0.4)',
        flex:1,
        // position:'relative',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',

        elevation:5,
        marginHorizontal:10,
        padding:20,
        // margin: 10,
        borderTopLeftRadius:40,
        borderBottomRightRadius:60,

        // padding:20,
        // margin:10,
    },
    image: {
        flex:1,
        // justifyContent:'center',
        alignItems:'center',
        width: 120,
        height:120,
        // marginTop:20,
        borderTopLeftRadius:100,
        borderBottomRightRadius:100,
        
    },
    nameText: {
        flex:1,
        // justifyContent:'center',
        // fontStyle:'italic',
        fontWeight:'700',
        color: 'gray',  
        fontSize:18,
        padding: 10, 
        color: 'rgba(185, 18, 118,0.4)',

    },
    trackIcon : {
        fontSize:40,       
        color:'beige',
        flex:1,
        // justifyContent:'center',
        // alignSelf:'center',
        // alignItems:'center',
       
        // width:100,
        // paddingHorizontal:45
        paddingLeft:45,
    },
    trackCon:{
        position:'absolute',
        backgroundColor:'rgba(0,0,0,0.7)',
        flex:1,
        // justifyContent:"center",
        flexDirection: 'row',
        // alignItems:'center',
        marginTop:30,

    }
})



