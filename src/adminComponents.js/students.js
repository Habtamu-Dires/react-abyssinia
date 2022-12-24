import { BooleanField, Datagrid, EditButton, List, NumberField, TextField ,
    BooleanInput, DateInput, Edit, NumberInput, SimpleForm, TextInput, useRecordContext, Create, ReferenceInput, ReferenceField, SelectInput, FormDataConsumer } from 'react-admin';


const studentFilter = [
    <TextInput source="q" label="Search" alwaysOn />,
    <TextInput source="id" label="Id" />
];

export const StudentList = () => (
    <List filters={studentFilter}>
        <Datagrid rowClick="edit">
            <TextField source="name" />
            <TextField source="phone" />
            <ReferenceField  source="program" reference="programs"/>
            <BooleanField source="enrolled" />
            <TextField source="payment" />
            <BooleanField source="certificateStatus" />
            <EditButton/>
        </Datagrid>
    </List>
);

const gender_choices =[
    { id: 'Female', name: 'Female' },
    { id: 'Male', name: 'Male' },
];

const education_choices = [
    { id: 'read_and_write', name: 'Read and Write' },
    { id: 'primary', name: 'Primary' },
    { id: 'secondary_school', name: 'Secondary School' },
    { id: 'diploma', name: 'Diploma' },
    { id: 'degree_and_above', name: 'Degree and Above' },
];

const day_choices = [
    { id: 'monday_to_friday', name: 'Monday - Friday' },
    { id: 'saturday_and_sunday', name: 'Saturday & Sunday' },
    { id: 'any_day', name: 'Any Day' },
];


const time_choices = [
    { id: 'morning', name: 'Morning' },
    { id: 'afternoon', name: 'Afternoon' },
    { id: 'night', name: 'Night' },
    { id: 'any_time', name: 'Any Time' },
];


const StudentTitle = () => {
    const record = useRecordContext();
    return <span>Student {record ? `${record.name}`: ''}</span>
}


export const StudentEdit = () => {
    return(
    <Edit title={<StudentTitle />}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput  source="name" />
            <TextInput source="phone" />
            <SelectInput source="gender" choices={
                gender_choices
            }/>
            <ReferenceInput source="program" reference="programs">
                <SelectInput />
            </ReferenceInput>
            <TextInput source="otherProgram" />
            <SelectInput source="educationStatus" choices={
                education_choices
            }/>
            <SelectInput source="preferredDays" choices={
                day_choices
            }/>
            <SelectInput source="preferredTime" choices={
                time_choices
            }/>
            <BooleanInput source="enrolled" />
            <TextInput source="payment" />
            <DateInput source="programStartDate" />
            <DateInput source="programEndDate" />
            <BooleanInput source="certificateStatus" />
            <TextInput source="remark" />
            <DateInput disabled source="createdAt" />
            <DateInput disabled source="updatedAt" />
        </SimpleForm>
    </Edit>
)};



export const StudentCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput  source="name" />
            <TextInput source="phone" />
            <SelectInput source="gender" choices={
                gender_choices
            }/>
            <ReferenceInput source="program" reference="programs" >
                <SelectInput />
            </ReferenceInput>
            <TextInput source="otherProgram" />
            <SelectInput source="educationStatus" choices={
                education_choices
            }/>
            <SelectInput source="preferredDays" choices={
                day_choices
            }/>
            <SelectInput source="preferredTime" choices={
                time_choices
            }/>
            <BooleanInput source="enrolled" />
            <TextInput source="payment" />
            <DateInput source="programStartDate" />
            <DateInput source="programEndDate" />
            <BooleanInput source="certificateStatus" />
            <TextInput source="remark" />
        </SimpleForm>
    </Create>
);