import React from 'react';
import ContactUsPage from '../customTemplates/CustomPages/ContactUsPage/ContactUsPage';
import Layout from '../components/layout';

const ContactPage = (props) => (
  <Layout location={props.location}>
    <ContactUsPage />
  </Layout>
);

export default ContactPage;
