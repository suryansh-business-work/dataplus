import React, { useEffect } from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#fff'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

const type = "A4";

const onload = () => {
  console.log('PDF Loaded')
}

const Doc: any = Document;
const PageView: any = Page;

// Create Document Component
const Invoice = () => (
  <React.Fragment>
    <Doc onRender={onload} author='Invoice' className="invoice-wrapper" title='Invoice'>
      <PageView wrap={false} size={type} style={styles.page} >
        <View style={styles.section}>
          <Text>Section #1</Text>
        </View>
        <View style={styles.section}>
          <Text>Section #2</Text>
        </View>
      </PageView>
    </Doc>
  </React.Fragment>
);

export const PdfGenerator: any = () => {
  return (
    <PDFViewer className="invoice-wrapper">
      <Invoice />
    </PDFViewer>
  )
};
