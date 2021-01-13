import React, { useEffect ,useState} from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Table } from 'react-bootstrap';
import 'react-tabs/style/react-tabs.css';
import Layout from '../../components/Layout';
//import _ from 'lodash';
import { graphql } from 'gatsby'

const Widget = (data) => {
    const [prismicData,setPrismicData] =  useState(data.data.allPrismicProduct.nodes[0].data);
	useEffect( () => {
        //console.log('prismic data=====',data.data.allPrismicProduct.nodes[0].data)
        createTemplate().then((widgetData) => {
			console.log('widgetData---', widgetData);
		});
	}, []);

	const createTemplate = async () => {
        const data = {
            "name": "prismic Banner3",
            "template": "<style>#bc-simple-text-{{_.id}} {color: {{color}};background: {{background_color}};font-size: {{font_size}};font-style: {{font_style}};font-weight: {{font_weight}};font-family: {{font_family}};text-align: {{text_align}};margin-top: {{margin_top}};margin-bottom: {{margin_bottom}};margin-left: {{margin_left}};margin-right: {{margin_right}};padding-top: {{padding_top}};padding-bottom: {{padding_bottom}};padding-left: {{padding_left}};padding-right: {{padding_right}};}</style><p id='bc-simple-text-{{_.id}}'>{{text}}</p>"
            };
		fetch(
            `/.netlify/functions/bigcommerce?endpoint=content/widget-templates`,
            {
                method: 'POST',
                credentials: 'same-origin',
                mode: 'same-origin',
                body: JSON.stringify(data),
            }
        )
            .then((response) => {
                console.log('r111=====>',response);
                console.log('r1body=====>',response.body);
                // const resp = response.json();
                // const createWidgetresp = createWidgets(resp.data.uuid);
                return response.json();
                //store user details in storage for display
            }).then(body => {
                const createWidgetresp = createWidgets(body.data.uuid);
            })
            .catch((error) => {
                console.error(error);
            });
    };
    
    const createWidgets = (temp_uid) => {
        const data = {
            "name": "Prismic Banner3",
            "widget_configuration": {
            "text": prismicData.name.text,
            "_.id": "1",
            "color": "#494E55",
            "background_color": "#E7E7E7",
            "font_size": "30px",
            "font_weight": "bold",
            "font_family": "'Google_Volkhov_400', sans-serif",
            "text_align": "center",
            "margin_right": "50px",
            "margin_left": "50px",
            "padding_top": "25px",
            "padding_bottom": "25px"
            },
            "widget_template_uuid": temp_uid
            };
		fetch(
            `/.netlify/functions/bigcommerce?endpoint=content/widgets`,
            {
                method: 'POST',
                credentials: 'same-origin',
                mode: 'same-origin',
                body: JSON.stringify(data),
            }
        )
            .then((response) => {
                console.log('r222=====>',response);
                
                return response.json();
                //store user details in storage for display
            }).then(body => {
                const placementResponce = createPlacements(body.data.uuid)
            })
            .catch((error) => {
                console.error(error);
            });
    };
    
    const createPlacements = (widget_uuid) => {
        const data = {
            "widget_uuid": widget_uuid,
            "template_file": "pages/category",
            "status": "active",
            "entity_id": "18",
            "sort_order": 1,
            "region": "header_bottom"
            };
		fetch(
            `/.netlify/functions/bigcommerce?endpoint=content/placements`,
            {
                method: 'POST',
                credentials: 'same-origin',
                mode: 'same-origin',
                body: JSON.stringify(data),
            }
        )
            .then((response) => {
                console.log('r333=====>',response);
                return response.json();
                //store user details in storage for display
            }).then(body => {
                console.log('final body=>>>',body);
            })
            .catch((error) => {
                console.error(error);
            });
    };
    

	return (
		<Layout>
      <div className='container'>
      <Tabs>
				<TabList>
					<Tab>Account</Tab>
					<Tab>Order History</Tab>
				</TabList>

				<TabPanel>
					<ul>
						<li>
							Name:{' '}
							{localStorage.getItem('first_name')
								? localStorage.getItem('first_name')
								: ''}
						</li>
						<li>
							E-mail:{' '}
							{localStorage.getItem('email')
								? localStorage.getItem('email')
								: ''}
						</li>
					</ul>
				</TabPanel>
				<TabPanel>
					<Table>
          
					</Table>
				</TabPanel>
			</Tabs>
      </div>
			
		</Layout>
	);
};

export default Widget;

export const pageQuery = graphql`
query widgetQuery {
    allPrismicProduct {
      nodes {
        data {
          name {
            text
          }
          image {
            url
          }
          description {
            text
          }
        }
      }
    }
  }    
`;