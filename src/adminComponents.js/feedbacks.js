import { BooleanField, BooleanInput, Datagrid, DateField, DateInput, Edit, EditButton, List, SimpleForm, TextField, TextInput } from 'react-admin';


const feedbackFilter = [
    <TextInput source="q" label="Search" alwaysOn />,
    <TextInput source="id" label="Program" />
];


export const FeedbackList = () => (
    <List filters={feedbackFilter}>
        <Datagrid rowClick="edit">
            <TextField source="name" />
            <TextField source="phone" />
            <DateField source="email" />
            <BooleanField source="mayWeContactYou" />
            <DateField source="contactWay" />
            <TextField source="feedback" />
            <EditButton />
        </Datagrid>
    </List>
);

export const FeedbackEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput disabled source="name" />
            <TextInput source="phone" />
            <TextInput source="email" />
            <BooleanInput source="mayWeContactYou" />
            <TextInput source="contactWay" />
            <TextInput disabled source="feedback" />
            <DateInput disabled source="createdAt" />
            <DateInput disabled source="updatedAt" />            
        </SimpleForm>
    </Edit>
);