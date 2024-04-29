import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import UserApi from '../../datalib/services/user.api';
import ScreenWrapper from '../../library/wrapper/ScreenWrapper';
import ChildScreensHeader from '../../components/MainComponents/ChildScreensHeader';
import R from '../../resources/R';
import { Item } from '../task/TaskScreen';

const ProjectDetailsScreen = ({route,navigation}) => {
  const [project, setProject] = useState({});
  console.log(route.params.projectId)
  useEffect(() => {
    if (route.params.projectId) {
      getProjectDetails({id: route.params.projectId});
    }
  }, [route.params.projectId]);

  const getProjectDetails = async ({id}) => {
    try {
      const res = await new UserApi().fetchProjectDetailsById({id});
      if (res) {
        console.log(res)
      setProject(res)
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
   <ScreenWrapper header={false}>
 <ChildScreensHeader
        style={{backgroundColor: R.colors.PRIMARY_LIGHT}}
        screenName={'Project Details'}
      />

      <View style={{paddingVertical:30,paddingHorizontal:20,gap:20}}>

        
      <View style={{flexDirection:"row"}}>
        

          <View style={{width:"50%"}}>
            <Text
             style={styles.label}
            
            >Project Name</Text>
          </View>
          <View style={{width:"50%"}}>
            <Text
             style={styles.value}
             >{project?.project_name}</Text>
          </View>
        </View>


      <View style={{flexDirection:"row"}}>
        

          <View style={{width:"50%"}}>
            <Text
             style={styles.label}
            
            >Status</Text>
          </View>
          <View style={{width:"50%"}}>
            <Text
             style={styles.value}
             >{project?.status}</Text>
          </View>
        </View>

      <View style={{flexDirection:"row"}}>
        

          <View style={{width:"50%"}}>
            <Text
             style={styles.label}
            
            >Deadline</Text>
          </View>
          <View style={{width:"50%"}}>
            <Text
             style={styles.value}
             >{project?.deadline?.slice(0,10)}</Text>
          </View>
        </View>

{/* <FlatList
data={project?.members}
renderItem={({item,index})=><Item item={item} navigation={navigation} />}

/> */}

      </View>
   </ScreenWrapper>
  );
};

export default ProjectDetailsScreen;

const styles = StyleSheet.create({
  label:{
    fontSize:20,
    fontWeight:"600"
  },
  value:{
    fontSize:20,
    fontWeight:"600",
    color:"black"
  },
});
 