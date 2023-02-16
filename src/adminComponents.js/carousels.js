import { Datagrid, EditButton, List, TextField, Edit,SimpleForm, TextInput, 
         useRecordContext, ImageInput, ImageField, Create } from 'react-admin';

export const CarouselList = () => (
    <List>
        <Datagrid rowClick="edit">            
            <TextField source="title" />
            <TextField source="sub_title" />
            <EditButton />  
        </Datagrid>
    </List>
);

const CarouselTitle = () => {
    const record = useRecordContext();
    return <span>Carousel {record ? `${record.id}`: ''}</span>
}

export const CarouselEdit = () => (
    <Edit title={<CarouselTitle />}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput fullWidth multiline source="title" />
            <TextInput fullWidth multiline source="sub_title" />
            <TextInput disabled source="image" />
            <ImageInput source="pictures" label="Carousel Picture">
                    <ImageField source="src" title="title" />
            </ImageInput>
        </SimpleForm>
    </Edit>
);

export const CarouselCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput required fullWidth multiline source="title" />
            <TextInput fullWidth multiline source="sub_title" />
            <TextInput disabled source="image" />
            <ImageInput required source="pictures" label="Carousel Picture">
                    <ImageField required source="src" title="title" />
            </ImageInput>
        </SimpleForm>
    </Create>
);