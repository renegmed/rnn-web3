import React, { PureComponent } from 'react'
import { View, Text,  FlatList, TouchableOpacity  } from 'react-native' 
import { connect } from 'react-redux';

import { action$fetchCampaigns } from './campaign.actions'; 
import { list  } from '../../appStyles'; 

class CampaignItem extends React.Component {
    
    onPress = () => { 
      //this.props.onPressItem(this.props.id);
    };
  
    render() { 
        alert(this.props.description)
        return (
            <TouchableOpacity onPress={this.onPress}>
                <View>
                    <Text style = {list.item}>
                      {this.props.description}
                    </Text> 
                </View> 
                    
            </TouchableOpacity>
        );
    }
}

class Campaigns extends React.Component { 
    
    constructor(props) {
        super(props)
        this.showDetails = this.showDetails.bind(this)
    }  

    // this update the props.campaigns state  
    componentDidMount() {
        this.props.action$fetchCampaigns();
    }


    showDetails = (itemId) => {   
        alert("Show details here")
        // Navigation.push(this.props.componentId, {
        //     component: {
        //       name: 'patient.ImmunDetails', 
        //         passProps: {
        //             itemId: itemId,
        //             data: this.props.data, 
        //         }                  
        //     }
        // });
    }

    // See: https://facebook.github.io/react-native/docs/flatlist

    renderItem = ({item}) => (
        <CampaignItem 
            id={item.id}
            onPressItem={this.showDetails} 
            title={item.description }             
        />
     );

    render() {
        const { campaigns } = this.props;      
        alert(campaigns.length) 
        //const dataList = Array.from( data.values() )
        return ( 
           <View style={list.container}> 
                <FlatList 
                    data={ campaigns }   
                    keyExtractor={(item, index) => `${item.id}`}
                    renderItem={this.renderItem} 
                /> 
            </View> 
        ) 
    } 
} 
 
function mapStateToProps(state) {
    return {
      campaigns: state.campaign
    }
}

export default connect(mapStateToProps, { action$fetchCampaigns }) (Campaigns);
