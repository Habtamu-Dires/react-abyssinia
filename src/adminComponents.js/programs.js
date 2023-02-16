import * as React from "react";

import { Datagrid, EditButton, List, TextField ,Edit, SimpleForm, TextInput, Create, 
    useRecordContext, BooleanInput, ImageField, ImageInput, ArrayInput, SimpleFormIterator, ArrayField, SingleFieldList, ChipField} from 'react-admin';

const programFilters = [
    <TextInput source="q" label="Search" alwaysOn />,
    <TextInput source="id" label="Id" />
];

export const ProgramList = () => (
    <List filters={programFilters}>
        <Datagrid>            
            <TextField source="name"/>
            <TextField source="price"/>
            <ArrayField source="modules">
                <SingleFieldList >
                    <ChipField source="module" />
                </SingleFieldList>
            </ArrayField>
            <EditButton />
        </Datagrid>
    </List>
);

const ProgramTitle = () => {
    const record = useRecordContext();
    return <span>Program {record ? `${record.name}`: ''}</span>
}

export const ProgramEdit = () => (
    <Edit title={<ProgramTitle />}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="name" />            
            <TextInput multiline fullWidth source="description" />
            <ArrayInput source="modules">
                <SimpleFormIterator inline>
                    <TextInput source="module" helperText={false}/>
                </SimpleFormIterator>
            </ArrayInput>
            <TextInput source="price" />
            <TextInput source="duration" />
            <TextInput source="prerequisite" />
            <BooleanInput source="featured" />
            <TextInput disabled source="image" />
            <ImageInput source="pictures" label="Program Picture">
                    <ImageField source="src" title="title" />
            </ImageInput>
        </SimpleForm>
    </Edit>
);

export const ProgramCreate = () => (
        <Create> 
            <SimpleForm>
                <TextInput required source="name" />
                <TextInput required multiline fullWidth source="description" />
                <ArrayInput source="modules">
                    <SimpleFormIterator inline>
                        <TextInput source="module" helperText={false}/>
                    </SimpleFormIterator>
                </ArrayInput>
                <TextInput  source="price" />
                <TextInput source="duration" />
                <TextInput source="prerequisite" />
                <BooleanInput source="featured" />
                <ImageInput source="pictures" label="Program Picture">
                    <ImageField source="src" title="title" />
                </ImageInput>
            </SimpleForm>                                    
        </Create>
    );

   
    
