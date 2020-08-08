import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, ScrollView, Image, ImageBackground} from 'react-native';
import { Button } from 'react-native-elements';
import Artist from './components/Artist';
import Album from './components/Album';

const API_ADDRESS = 'http://spotify-api-wrapper.appspot.com';

export default class App extends Component{

  state= {
      artistQuery : ' ',
      artistData: null,
      tracks : [] 
  }

  searchArtist =()=>{

  // console.log("Inside Search")
    fetch(`${API_ADDRESS}/artist/${this.state.artistQuery}`)
    .then(response => response.json())
    .then(json =>{;
      if(json.artists.total> 0){
        const artistData = json.artists.items[0];
        this.setState({artistData});
  
        fetch(`${API_ADDRESS}/artist/${artistData.id}/top-tracks`)
        .then(response => response.json())
        .then(json => this.setState({ tracks: json.tracks}))
        .catch(error => alert("Alert here",error.message));
      }
  
    })
    .catch(error => alert(" Searching.... "));
  }

  render(){

  return (
    <View style={styles.container}>
        <View  style={styles.top}>
          <Text style={{fontSize:45,color:'beige', fontWeight:'700', }} >Music App</Text>
          <Text style={{fontSize:15,color:'beige', fontStyle:'italic'}} >( credits : Spotify )</Text>
        </View>


        <View  style={styles.bottom}>
            <TextInput style={styles.input} placeholder="Search For an Artist" onChangeText={(text)=>this.setState({ artistQuery: text })}  />
            <Button
                title="Search"
                type="outline"
                buttonStyle={{borderRadius:10, borderWidth:2 , padding:10, marginTop:20, fontSize:25, borderColor: "rgba(185, 18, 118,0.6)"}}
                titleStyle={{fontSize:20, color: "rgba(185, 18, 118,0.6)"}}
                onPress={()=> this.searchArtist()}
              />



                <ScrollView showsVerticalScrollIndicator={false}>
                <Artist singer={this.state.artistData} />
                <Album album={this.state.tracks} />
                <Image style={styles.img} source={require('./assets/splash.png')}   resizeMode='contain'    />
                </ScrollView>



        </View>
    </View>
  );
  }
}

const w = Dimensions.get("screen").width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: "rgb(185, 18, 118)",
      backgroundColor:'#3EBEB3',
  },
  top:{
    flex:1,
    // backgroundColor: "rgb(185, 18, 118)",
    backgroundColor:'#3EBEB3',
    width: w,
    alignItems: 'center',
    justifyContent: 'center',
    
  },

  bottom:{

     borderColor:"rgba(0,0,0,0.5)",
    borderWidth:5,

    flex:3,
    backgroundColor: "#fff" ,
    width: w,
    borderTopLeftRadius: 120,
    borderBottomRightRadius:100,
    alignItems: 'center',
    justifyContent: 'center',
    elevation:10,
  },
  input : {
    fontSize:20,
    borderBottomWidth: 4,
    padding:10,
    borderColor:'rgba(185, 18, 118,0.6)'
  },
  btn : {
    padding:10,
    marginTop:20,
    borderRadius:10,

  },
  card:{
    height:150,
    width:"80%",
    backgroundColor:"white",
    borderRadius:15,
    padding:10,
    elevation:10,
  },
  img : {
    width:350,
    height:400,
  }
});
