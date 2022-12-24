import * as React from 'react';
import { Admin, Resource } from 'react-admin';
import Dashboard from './Dashboard';
import authProvider from './authProvider';
import dataProvider from './dataProvider';
import { ProgramCreate, ProgramEdit, ProgramList } from './programs';
import ProgramICon from '@mui/icons-material/Book';
import StudentIcon from '@mui/icons-material/Person'
import { CarouselCreate, CarouselEdit, CarouselList } from './carousels';
import { StudentCreate, StudentEdit, StudentList } from './students';
import { FeedbackEdit, FeedbackList } from './feedbacks';
import { ClassCreate, ClassEdit, ClassList } from './classes';
import { StuffCreate, StuffEdit, StuffList } from './stuffs';

const AdminApp = () => (
   <Admin basename='/admin' dataProvider={dataProvider} authProvider={authProvider} dashboard={Dashboard}>
      <Resource name="programs" list={ProgramList} edit={ProgramEdit} create={ProgramCreate}
               icon={ProgramICon} recordRepresentation="name"/>
      <Resource name='students' list={StudentList} edit={StudentEdit} create={StudentCreate} 
               icon={StudentIcon} recordRepresentation="name"/>
      <Resource name="carousels" list={CarouselList} edit={CarouselEdit} create={CarouselCreate} />
      <Resource name="feedbacks" list={FeedbackList}  edit={FeedbackEdit}/>
      <Resource name="classes" list={ClassList} edit={ClassEdit} create={ClassCreate}/>
      <Resource name="stuffs" list={StuffList} edit={StuffEdit} create={StuffCreate}/>
   </Admin>
);

export default AdminApp;
