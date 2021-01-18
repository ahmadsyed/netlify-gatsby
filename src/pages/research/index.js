import React, { useEffect ,useState} from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Table } from 'react-bootstrap';
import 'react-tabs/style/react-tabs.css';
import Layout from '../../components/Layout';
//import _ from 'lodash';
import { graphql } from 'gatsby'

const Research = (data) => {
    console.log("data-with data---",data.data);
    const [prismicData,setPrismicData] =  useState(data.data.prismicResearch.data.research_header);
	useEffect( () => {
        console.log('prismic data=====',data.data.prismicResearch.data.research_header.url)
         createTemplate().then((widgetData) => {
			console.log('widgetData---', widgetData);
		});
	}, []);

	const createTemplate = async () => {
        const data = {
            "name": "prismic demo research",
            "template": "<img src={{image_source}} style='width:33.3%'/>"
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
                // console.log('r111=====>',response);
                // console.log('r1body=====>', response.json());
                // const resp = response.json();
                // const createWidgetresp = createWidgets(resp.data.uuid);
                return response.json();
                //store user details in storage for display
            }).then(body => {
                console.log('body-----',body.data.uuid)
                const createWidgetresp = createWidgets(body.data.uuid);
            })
            .catch((error) => {
                console.error(error);
            });
    };
    
    const createWidgets = (temp_uid) => {
        const data = {
            "name": "Prismic Demo Research",
            "widget_configuration": {
                "images": [{
                    "image_source": prismicData.url
                    }]
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
            "template_file": "/research/",
            "status": "active",
            "entity_id": "1",
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

export default Research;

export const pageQuery = graphql`
query widgetResearchQuery {
    prismicResearch{
        id
        href
        data{research_header{url}}
      }
  }    
`;