import React from 'react';
import { render } from 'react-dom';
import restProvider from './ra-data-hal';
import {Create, ReferenceArrayField, ReferenceManyField, SingleFieldList, ChipField,ReferenceField, EditGuesser, SimpleForm, Edit,TextInput, List, Datagrid, TextField, DateField, Admin, Resource, ListGuesser } from 'react-admin';

export const HotelEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <ReferenceField label="City" source="_links.city.href" reference="cities">
                <TextField source="country" />
                <TextField source="name" />
            </ReferenceField>            
            <TextInput source="name" />
            <TextInput source="address" />
            <TextInput source="zip" />
        </SimpleForm>
    </Edit>
);

export const CityList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <ReferenceManyField label="Hotels" source="_links.hotels.href" reference="hotels">
                <SingleFieldList>
                    <ChipField source="name" />
                </SingleFieldList>
            </ReferenceManyField>            
            <TextField source="name" />
            <TextField source="state" />
            <TextField source="country" />
            <TextField source="map" />
       </Datagrid>
    </List>
);

export const HotelList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <ReferenceField label="City" source="_links.city.href" reference="cities">
              <TextField source="name" />
            </ReferenceField>            
            <TextField source="name" />
            <TextField source="address" />
            <TextField source="zip" />
        </Datagrid>
    </List>
);

export const UserCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" />
        </SimpleForm>
    </Create>
);


const App = () => (
      <Admin dataProvider={restProvider('http://localhost:8080')}>
        <Resource name="cities" list={CityList}/>
        <Resource name="users" create={UserCreate} list={ListGuesser} edit={EditGuesser}/>
        <Resource name="groups" create={EditGuesser} list={ListGuesser} edit={EditGuesser}/>
        <Resource name="hotels" list={HotelList} edit={HotelEdit}/>
    </Admin>
)

export default App;
