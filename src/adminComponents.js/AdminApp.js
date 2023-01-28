import * as React from 'react';
import { Admin, Resource } from 'react-admin';
import Dashboard from './Dashboard';
import authProvider from './authProvider';
import dataProvider from './dataProvider';
import { ProgramCreate, ProgramEdit, ProgramList } from './programs';
import ProgramICon from '@mui/icons-material/Book';
import StudentIcon from '@mui/icons-material/People';
import StuffICon from '@mui/icons-material/Person';
import ClassIcon from '@mui/icons-material/CastForEducation';
import FeedbackIcon from '@mui/icons-material/Feedback';
import CarouselIcon from '@mui/icons-material/Slideshow'
import { CarouselCreate, CarouselEdit, CarouselList } from './carousels';
import { StudentCreate, StudentEdit, StudentList } from './students';
import { FeedbackEdit, FeedbackList } from './feedbacks';
import { ClassCreate, ClassEdit, ClassList } from './classes';
import { StuffCreate, StuffEdit, StuffList } from './stuffs';
import MyLoginPage from './MyLoginPage';

const AdminApp = () => (
   <Admin basename='/admin' loginPage={MyLoginPage} dataProvider={dataProvider} authProvider={authProvider} dashboard={Dashboard}>
      <Resource name="programs" list={ProgramList} edit={ProgramEdit} create={ProgramCreate}
               icon={ProgramICon} recordRepresentation="name"/>
      <Resource name='students' list={StudentList} edit={StudentEdit} create={StudentCreate} 
               icon={StudentIcon} recordRepresentation="name"/>
      <Resource name="carousels" list={CarouselList} edit={CarouselEdit} create={CarouselCreate} 
               icon={CarouselIcon}/>
      <Resource name="feedbacks" list={FeedbackList}  edit={FeedbackEdit} icon={FeedbackIcon}/>
      <Resource name="classes" list={ClassList} edit={ClassEdit} create={ClassCreate}
               icon={ClassIcon}/>
      <Resource name="stuffs" list={StuffList} edit={StuffEdit} create={StuffCreate}
               icon={StuffICon}/>
   </Admin>
);

export default AdminApp;
