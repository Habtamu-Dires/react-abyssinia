import { Datagrid, EditButton, List, TextField, Edit, SimpleForm, TextInput, Create, useRecordContext } from 'react-admin';


const stuffFilter = [
    <TextInput source="q" label="Search" alwaysOn />,
    <TextInput source="id" label="Id" />
];


export const StuffList = () => (
    <List filters={stuffFilter}>
        <Datagrid rowClick="edit">
            <TextField source="name" />
            <TextField source="designation" />
            <EditButton />
        </Datagrid>
    </List>
);


const StuffTitle = () => {
    const record = useRecordContext();
    return <span>Stuff {record ? `${record.name}`: ''}</span>
}

export const StuffEdit = () => (
    <Edit title={<StuffTitle />}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="name" />
            <TextInput source="designation" />
            <TextInput multiline fullWidth source="description" />
        </SimpleForm>
    </Edit>
);


export const StuffCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="name" />
            <TextInput source="designation" />
            <TextInput source="description" />
        </SimpleForm>
    </Create>
);
