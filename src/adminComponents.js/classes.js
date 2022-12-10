import axios from 'axios';
import fetch from 'cross-fetch';
import { useState } from 'react';
import { ArrayField, ChipField, Datagrid, EditButton, List, SingleFieldList, TextField,
    ArrayInput, DateInput, Edit, ReferenceInput, SimpleForm, SimpleFormIterator, TextInput,
    ReferenceField, 
    SelectInput,
    Create,
    useRecordContext,
    DateField,
    FormDataConsumer} from 'react-admin';

import {Loading} from '../components/LoadingComponent'


export const ClassList = () => (
    <List>
        <Datagrid rowClick="edit">
            <ReferenceField source="program" reference='programs'/>
            {/*
            <ArrayField source="students">
                <SingleFieldList>                   
                    <ReferenceField source="student" reference="students"/>           
                </SingleFieldList>                               
            </ArrayField>
            */}
            <ArrayField source="schedule">
                <SingleFieldList>
                    <>
                        <ChipField source="day"/>
                        <ChipField source="partOfTheDay"/>
                        <ChipField source="time"/>
                    </>                    
                </SingleFieldList>      
            </ArrayField>
            <DateField source="classStartDate" />
            <EditButton />
        </Datagrid>
    </List>
);

const partOfTheDay = [
    {'id': 'morning', name:"Morning"},
    {'id': 'afternoon', name: "Afternoon"},
    {'id': 'night', name: "Night"}
]

function ClassTitle  ({EditContext,setValue,renderStatus,setRenderStatus}) {
    //get the program
    const record = useRecordContext();
    const theProgram = record ? record.program : null;
    
    if(renderStatus && theProgram) {
        EditContext({setValue,theProgram})
        setRenderStatus(false)
    }
    
    return <span>Class {record ? `${record.program}`: ''}</span>
}


function EditContext({setValue,theProgram=undefined}) {
    
    const apiUrl = 'http://localhost:3000/students';
    axios.get(apiUrl)
    .then(response => {
        if(theProgram){
            let student_list = response.data.filter(student => 
                student.program === theProgram );
            
            student_list.forEach(student => {
                if(student['enrolled'] === true)
                    student['disabled'] = true
            })    

            setValue(student_list)
            
        } else{
            setValue(response.data)
            
        } 
    
    })
    .catch(error => console.log('\nError '+ error.message))
}


export const ClassEdit = () => {

    const [studentList, setValue] = useState([]); // state
    const [renderStatus, setRenderStatus] = useState(true)
    
    if(!Array.isArray(studentList) || studentList.length == 0) {
         EditContext({setValue})
         return <Loading />
    } else{
        return(
            <Edit title={<ClassTitle EditContext={EditContext} setValue={setValue}
                                                renderStatus={renderStatus} setRenderStatus={setRenderStatus}/>}>
                <SimpleForm>
                    <TextInput disabled source="id" />
                    <ReferenceInput source="program" reference="programs">
                        <SelectInput />
                    </ReferenceInput>            
                    <ArrayInput source="schedule">
                        <SimpleFormIterator inline>
                            <TextInput source="day" />
                            <SelectInput source='partOfTheDay' choices={partOfTheDay}/>
                            <TextInput source="time" />
                        </SimpleFormIterator>
                    </ArrayInput>
                    <DateInput source="classStartDate" />
                    <DateInput source="classEndDate" />
                    <ArrayInput source="students">
                        <SimpleFormIterator>
                                <SelectInput source="student" choices={studentList} 
                                     optionText="name" optionValue='id'/>                                    
                        </SimpleFormIterator>
                    </ArrayInput>            
                </SimpleForm>
            </Edit>
            
        )    
    }
}; 
//for create

const CreateContext = ({setValue}) => {
    const apiUrl = 'http://localhost:3000/students';
        axios.get(apiUrl)
        .then(response => {
            let student_list = response.data.filter(student => 
                student.enrolled === false);
            setValue(student_list)
        })
      
}

export const ClassCreate = () => {
   const[studentList, setValue] = useState([])
   const[programList, setList] = useState([])
   if(!Array.isArray(studentList) || studentList.length == 0) {
        CreateContext({setValue})
   }
    return(
        <Create>
            <SimpleForm>
                <ReferenceInput source="program" reference="programs">
                    <SelectInput />
                </ReferenceInput>            
                <ArrayInput required source="schedule">
                    <SimpleFormIterator inline>
                        <TextInput source="day" />
                        <SelectInput source='partOfTheDay' choices={partOfTheDay}/>
                        <TextInput source="time" />
                    </SimpleFormIterator>
                </ArrayInput>
                <DateInput required source="classStartDate" />
                <DateInput source="classEndDate" />
                <ArrayInput required source="students">
                    <SimpleFormIterator>
                        <FormDataConsumer>
                            {({formData, scopedFormData, getSource, ...rest})=>
                                (
                                    <SelectInput  onCreate={()=>{
                                        let theProgram = formData.program
                                        const new_list = studentList.filter(student =>
                                            student.program === theProgram    
                                        )
                                        setList(new_list)
                                        return new_list
                                    }}
                                    source={getSource('student')} choices={programList} 
                                    {...rest}/>
                                )
                            }
                        </FormDataConsumer>
                    </SimpleFormIterator>                    
                </ArrayInput>            
            </SimpleForm>
        </Create>
    )
}; 
/**
 * 
 * <SimpleFormIterator inline>
        <SelectInput onCreate={()=>{
    
        }}  source="student" choices={studentList} 
            optionText="name" optionValue='id' />
    </SimpleFormIterator>
 */
