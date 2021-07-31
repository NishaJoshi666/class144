import * as React from 'react';
import { View,Text,StyleSheet,TouchableOpacity,FlatList } from 'react-native';
import { Card } from 'react-native-elements';
import axios from 'axios';
import { RFValue } from 'react-native-responsive-fontsize';

export default class Popular extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            data : []
        }
    }

    timeConvert(num){
        var r = Math.floor(num/60)
        var min = num%60
        return `${r} hrs ${min} mins`
    }

    getData=()=>{
        const url = 'http://localhost:5000/popular-movies'
        axios
        .get(url)
        .then(async(response)=>{this.setState({data:response.data.data})})
        .catch((errar)=>{console.log(errar)})
    }
    
    componentDidMount(){
        this.getData()
    }
    keyextractor=(item,Index)=>{
        Index.toString()
    }

    renderitem=(item,Index)=>{
        return(
            <Card
            key = {`card-${Index}`}
            image = {{uri:item.poster_link}}
            imageProps = {{resizeMode:'cover'}}
            featuredTitle = {item.title}
            containerStyle = {styles.cardContainer}
            featuredTitleStyle = {styles.title}
            featuredSubtitle = {`${ item.release_date.split("-")[0] } | ${this.timeConvert(item.duration)}`} 
            featuredSubtitleStyle = {styles.subtitle}
            />
        )
    }

    render(){
        return(
            <View style={styles.container}>
            <FlatList
            data = {this.state.data}
            keyExtractor = {this.keyextractor}
            renderItem = {this.renderitem}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  title: {
    color: "#fff",
    alignSelf: "flex-start",
    paddingLeft: RFValue(15),
    fontSize: RFValue(25),
    marginTop: RFValue(65)
  },
  subtitle: {
    fontWeight: "bold",
    alignSelf: "flex-start",
    paddingLeft: RFValue(15),
    fontSize: RFValue(15)
  },
  cardContainer: {
    flex: 1,
    borderRadius: RFValue(10),
    justifyContent: "center",
    height: RFValue(110),
    marginBottom: RFValue(20)
  }
});