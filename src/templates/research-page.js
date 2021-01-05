import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';

// "@fortawesome/fontawesome-svg-core": "^1.2.32",
//     "@fortawesome/free-solid-svg-icons": "^5.15.1",
//     "@fortawesome/react-fontawesome": "^0.1.14",

import ssvir from '../img/small_small_Virus_Icon_RED.png';
import particulate from '../img/small_small_Dust_Red_Icon.png';
import vocs from '../img/small_small_VOCs_Icon_RED.png';
import moldSpores from '../img/small_small_Mould_Icon_RED.png';
import bacteria from '../img/small_small_Bacteria_Icon_RED.png';


export const ResearchPageTemplate = ({ 
  image, 
  title, 
  content, 
  contentComponent 
}) => {
  //const PageContent = contentComponent || Content

  return (
    <div className="content">
      <div
        className="full-width-image-container margin-top-0"
        style={{
          backgroundImage: `url(${
            !!image.childImageSharp ? image.childImageSharp.fluid.src : image
          })`
        }}>
        <div className="container">
            <div className="columns">
                <div className="column is-8 is-offset-2">
                    <div className="section has-text-centered">                    
                        <h2 className="has-text-weight-bold is-size-1">{title}</h2>
                        <div className="clear"></div>
                        <p>WellAir's products have been shown to safely and effectively reduce bacteria, viruses, VOCs, and particulate matter in dozens of independent laboratory tests. In case studies and clinical trials, our products have been demonstrated to reduce infection in real-world settings.</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
      
      <div className="container">
        <div className="columns">
          <div className="column is-6 is-offset-3">
            <div className="search_box">
              {/* <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
                {title}
              </h2> */}
              {/* <PageContent className="content" content={content} /> */}
                <Tabs defaultIndex={0} onSelect={index => console.log(index)}>
                  <TabList className="has-text-centered">
                    <Tab>Search</Tab>
                    <Tab>Filter</Tab>
                  </TabList>

                  <TabPanel>
                    <div className="field">
                      <div className="control has-icons-right">
                        <input className="input is-medium" type="text" placeholder="Search" />
                        <span className="icon is-small is-right">
                          <FontAwesomeIcon icon={faSearch} />
                        </span>
                      </div>
                    </div>
                  </TabPanel>
                  <TabPanel>
                    <div className="select is-block is-medium">
                        <select className="is-block">
                          <option>Option 1</option>
                          <option>Option 2</option>
                          <option>Option 3</option>
                          <option>Option 4</option>
                          <option>Option 5</option>
                        </select>
                    </div>
                  </TabPanel>
                </Tabs>
            </div>
          </div>
        </div>

        
        <div className="columns">
          <div className="column">
            <div className="section tab_cont">              
                <Tabs defaultIndex={0} onSelect={index => console.log(index)}>                
                  <div className="columns">
                    <div className="column is-8 is-offset-2">
                      <TabList className="has-text-centered">
                        <Tab>Test results</Tab>
                        <Tab>Lab studies</Tab>
                        <Tab>Clinical trials</Tab>
                        <Tab>Case studies</Tab>
                      </TabList>
                    </div>
                  </div>
                  <div className="columns">                  
                    <div className="column">
                  
                      <TabPanel>
                        <div className="has-text-centered clearfix pb-5">
                            <p>Summary of the dozens of independent laboratory tests carried out on Novaerus technology.</p>
                        </div>
                        
                        <div className="columns is-gapless test_detail_cont">
                          <div className="column is-4">
                            <div className="outer-image-section">
                                <img src={ssvir} alt="ssvir" />
                              <h3 className="section-name">Viruses</h3>
                            </div>
                          </div>
                          <div className="column is-8">
                            <table className="table is-striped">
                              <thead>
                                <tr>
                                  <th>Name</th>
                                  <th>Reduction.</th>
                                  <th className="hide-mobile">Time</th>
                                  <th className="hide-mobile">Space</th>
                                  <th>Model</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td><a className="link-style" href="#">SARS-CoV-2</a></td>
                                  <td>99.99%</td>
                                  <td className="hide-mobile">15 min</td>
                                  <td className="hide-mobile">16 m<sup>3</sup></td>
                                  <td>NV1050</td>
                                </tr>
                                <tr>
                                  <td>
                                    <a className="link-style" href="#">
                                      Measles
                                    </a>
                                  </td>
                                  <td>
                                    99.87%
                                  </td>
                                  <td className="hide-mobile">
                                    20-30 min
                                  </td>
                                  <td className="hide-mobile">
                                    28.5 m<sup>3</sup>
                                  </td>
                                  <td>
                                    NV1050
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a className="link-style" href="#">
                                      Influenza A
                                    </a>
                                  </td>
                                  <td>
                                    99.9%
                                  </td>
                                  <td className="hide-mobile">
                                    10-20 min
                                  </td>
                                  <td className="hide-mobile">
                                    28.5 m<sup>3</sup>
                                  </td>
                                  <td>
                                    NV1050
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a className="link-style" href="#">
                                      Phi X 174
                                    </a>
                                  </td>
                                  <td>
                                    98.8%
                                  </td>
                                  <td className="hide-mobile">
                                    30 min
                                  </td>
                                  <td className="hide-mobile">
                                    60 m<sup>3</sup>
                                  </td>
                                  <td>
                                    NV1050
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a className="link-style" href="#">
                                      SARS-CoV-2
                                    </a>
                                  </td>
                                  <td>
                                    99.99%
                                  </td>
                                  <td className="hide-mobile">
                                    5 hours
                                  </td>
                                  <td className="hide-mobile">
                                    16 m<sup>3</sup>
                                  </td>
                                  <td>
                                    NV900
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a className="link-style" href="#">
                                      Norovirus
                                    </a>
                                  </td>
                                  <td>
                                    99.99%
                                  </td>
                                  <td className="hide-mobile">
                                    5 hours
                                  </td>
                                  <td className="hide-mobile">
                                    16 m<sup>3</sup>
                                  </td>
                                  <td>
                                    NV900
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a className="link-style" href="#">
                                      Influenza A
                                    </a>
                                  </td>
                                  <td>
                                    99.99%
                                  </td>
                                  <td className="hide-mobile">
                                    5 hours
                                  </td>
                                  <td className="hide-mobile">
                                    16 m<sup>3</sup>
                                  </td>
                                  <td>
                                    NV900
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>

                        <div className="columns is-gapless test_detail_cont">
                          <div className="column is-4">
                            <div className="outer-image-section">
                                <img src={bacteria} alt="ssvir" />
                                <h3 className="section-name">Bacteria</h3>
                            </div>
                          </div>
                          <div className="column is-8">
                            <table className="table is-striped">
                              <thead>
                                <tr>
                                  <th>Name</th>
                                  <th>Reduction.</th>
                                  <th className="hide-mobile">Time</th>
                                  <th className="hide-mobile">Space</th>
                                  <th>Model</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>
                                    <a className="link-style" href="#">
                                      Tuberculosis
                                    </a>
                                  </td>
                                  <td>
                                    97%
                                  </td>
                                  <td className="hide-mobile">
                                    30 min
                                  </td>
                                  <td className="hide-mobile">
                                    30 m<sup>3</sup>
                                  </td>
                                  <td>
                                    NV1050
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a className="link-style" href="#">
                                      MRSA
                                    </a>
                                  </td>
                                  <td>
                                    99.94%
                                  </td>
                                  <td className="hide-mobile">
                                    15 min
                                  </td>
                                  <td className="hide-mobile">
                                    30 m<sup>3</sup>
                                  </td>
                                  <td>
                                    NV1050
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a className="link-style" href="#">
                                      <i>Clostridicum difficile</i> spores
                                    </a>
                                  </td>
                                  <td>
                                    99.9%
                                  </td>
                                  <td className="hide-mobile">
                                    40 min
                                  </td>
                                  <td className="hide-mobile">
                                    28.5 m<sup>3</sup>
                                  </td>
                                  <td>
                                    NV1050
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a className="link-style" href="#">
                                      <i>Staphylococcus epidermidis</i>
                                    </a>
                                  </td>
                                  <td>
                                    99.9%
                                  </td>
                                  <td className="hide-mobile">
                                    60 min
                                  </td>
                                  <td className="hide-mobile">
                                    60 m<sup>3</sup>
                                  </td>
                                  <td>
                                    NV1050
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a className="link-style" href="#">
                                      MRSA
                                    </a>
                                  </td>
                                  <td>
                                    99.99%
                                  </td>
                                  <td className="hide-mobile">
                                    4 hours
                                  </td>
                                  <td className="hide-mobile">
                                    1 m<sup>3</sup>
                                  </td>
                                  <td>
                                    NV900
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a className="link-style" href="#">
                                      <i>Bacillus subtilis</i>
                                    </a>
                                  </td>
                                  <td>
                                    86.63%
                                  </td>
                                  <td className="hide-mobile">
                                    6 hours
                                  </td>
                                  <td className="hide-mobile">
                                    16 m<sup>3</sup>
                                  </td>
                                  <td>
                                    NV900
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a className="link-style" href="#">
                                      <i>Escherichia coli</i>
                                    </a>
                                  </td>
                                  <td>
                                    71.80%
                                  </td>
                                  <td className="hide-mobile">
                                    5 min
                                  </td>
                                  <td className="hide-mobile">
                                    2.3 m<sup>3</sup>
                                  </td>
                                  <td>
                                    NV200
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>

                        <div className="columns is-gapless test_detail_cont">
                          <div className="column is-4">
                            <div className="outer-image-section">
                              <img src={moldSpores} alt="ssvir" />
                              <h3 className="section-name">Mold Spores</h3>
                            </div>
                          </div>
                          <div className="column is-8">
                            <table className="table is-striped">
                              <thead>
                                <tr>
                                  <th>Name</th>
                                  <th>Reduction.</th>
                                  <th className="hide-mobile">Time</th>
                                  <th className="hide-mobile">Space</th>
                                  <th>Model</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>
                                    <a className="link-style" href="#">
                                      <i>Aspergillus niger</i>
                                    </a>
                                  </td>
                                  <td>
                                    99.99%
                                  </td>
                                  <td className="hide-mobile">
                                    30 min
                                  </td>
                                  <td className="hide-mobile">
                                    16 m<sup>3</sup>
                                  </td>
                                  <td>
                                    NV1050
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a className="link-style" href="#">
                                      <i>Aspergillus niger</i>
                                    </a>
                                  </td>
                                  <td>
                                    99.10%
                                  </td>
                                  <td className="hide-mobile">
                                    4 hours
                                  </td>
                                  <td className="hide-mobile">
                                    16 m<sup>3</sup>
                                  </td>
                                  <td>
                                    NV900
                                  </td>
                                </tr>                                
                              </tbody>
                            </table>
                          </div>
                        </div>

                        <div className="columns is-gapless test_detail_cont">
                          <div className="column is-4">
                            <div className="outer-image-section">
                                <img src={vocs} alt="ssvir" />
                              <h3 className="section-name">VOCS</h3>
                            </div>
                          </div>
                          <div className="column is-8">
                            <table className="table is-striped">
                              <thead>
                                <tr>
                                  <th>Name</th>
                                  <th>Reduction.</th>
                                  <th className="hide-mobile">Time</th>
                                  <th className="hide-mobile">Space</th>
                                  <th>Model</th>
                                </tr>
                              </thead>
                              <tbody>
                                    <tr>
                                      <td>
                                        <a className="link-style" href="#">
                                          Nitrogen Dioxide
                                        </a>
                                      </td>
                                      <td>
                                        99.49%
                                      </td>
                                      <td className="hide-mobile">
                                        7.2 min
                                      </td>
                                      <td className="hide-mobile">
                                        16 m<sup>3</sup>
                                      </td>
                                      <td>
                                        NV1050
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <a className="link-style" href="#">
                                          Formaldehyde
                                        </a>
                                      </td>
                                      <td>
                                        99.68%
                                      </td>
                                      <td className="hide-mobile">
                                        1.1 min
                                      </td>
                                      <td className="hide-mobile">
                                        16 m<sup>3</sup>
                                      </td>
                                      <td>
                                        NV1050
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <a className="link-style" href="#">
                                          Toluene
                                        </a>
                                      </td>
                                      <td>
                                        99%
                                      </td>
                                      <td className="hide-mobile">
                                        9.1 min
                                      </td>
                                      <td className="hide-mobile">
                                        19.72 m<sup>3</sup>
                                      </td>
                                      <td>
                                        NV1050
                                      </td>
                                    </tr>
                                </tbody>
                            </table>
                          </div>
                        </div>

                        <div className="columns is-gapless test_detail_cont">
                          <div className="column is-4">
                            <div className="outer-image-section">
                                <img src={particulate} alt="ssvir" />
                              <h3 className="section-name">Particulate</h3>
                            </div>
                          </div>
                          <div className="column is-8">
                            
                            <table className="table is-striped">
                              <thead>
                                <tr>
                                  <th>Name</th>
                                  <th>Reduction.</th>
                                  <th className="hide-mobile">Time</th>
                                  <th className="hide-mobile">Space</th>
                                  <th>Model</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>
                                    <a className="link-style" href="#">
                                      PM 1
                                    </a>
                                  </td>
                                  <td>
                                    99%
                                  </td>
                                  <td className="hide-mobile">
                                    6.33 min
                                  </td>
                                  <td className="hide-mobile">
                                    19.72 m<sup>3</sup>
                                  </td>
                                  <td>
                                    NV1050
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a className="link-style" href="#">
                                      PM 2.5
                                    </a>
                                  </td>
                                  <td>
                                    99%
                                  </td>
                                  <td className="hide-mobile">
                                    6.26 min
                                  </td>
                                  <td className="hide-mobile">
                                    19.72 m<sup>3</sup>
                                  </td>
                                  <td>
                                    NV1050
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </TabPanel>
                      <TabPanel>
                        <div className="columns">
                          <div className="column is-4">
                            {/* Card start */}
                            <a className="card tabsub_cont" href="#">
                              <h4>SARS-CoV-2 Reduction test 1</h4>
                              <p>Novaerus Defend 1050 was shown to reduce MS2 bacteriophage, a surrogate for SARS-CoV-2, by 99.99% in 15 minutes.</p>
                              <h6>TAGS: NV1050, Aerosol, Virus, MS2, SARS-CoV, SARS-CoV-2, COVID-19</h6>
                              <div className="has-text-right">
                                <span>Full Report</span>
                                <FontAwesomeIcon icon={faArrowAltCircleRight} size="lg" />
                              </div>
                            </a>
                            {/* Card end */}
                            {/* Card start */}
                            <a className="card tabsub_cont" href="#">
                              <h4>SARS-CoV-2 Reduction</h4>
                              <p>Novaerus Defend 1050 was shown to reduce MS2 bacteriophage, a surrogate for SARS-CoV-2, by 99.99% in 15 minutes.</p>
                              <h6>TAGS: NV1050, Aerosol, Virus, MS2, SARS-CoV, SARS-CoV-2, COVID-19</h6>
                              <div className="has-text-right">
                                <span>Full Report</span>
                                <FontAwesomeIcon icon={faArrowAltCircleRight} size="lg" />
                              </div>
                            </a>
                            {/* Card end */}
                            {/* Card start */}
                            <a className="card tabsub_cont" href="#">
                              <h4>SARS-CoV-2 Reduction</h4>
                              <p>Novaerus Defend 1050 was shown to reduce MS2 bacteriophage, a surrogate for SARS-CoV-2, by 99.99% in 15 minutes.</p>
                              <h6>TAGS: NV1050, Aerosol, Virus, MS2, SARS-CoV, SARS-CoV-2, COVID-19</h6>
                              <div className="has-text-right">
                                <span>Full Report</span>
                                <FontAwesomeIcon icon={faArrowAltCircleRight} size="lg" />
                              </div>
                            </a>
                            {/* Card end */}
                            {/* Card start */}
                            <a className="card tabsub_cont" href="#">
                              <h4>SARS-CoV-2 Reduction</h4>
                              <p>Novaerus Defend 1050 was shown to reduce MS2 bacteriophage, a surrogate for SARS-CoV-2, by 99.99% in 15 minutes.</p>
                              <h6>TAGS: NV1050, Aerosol, Virus, MS2, SARS-CoV, SARS-CoV-2, COVID-19</h6>
                              <div className="has-text-right">
                                <span>Full Report</span>
                                <FontAwesomeIcon icon={faArrowAltCircleRight} size="lg" />
                              </div>
                            </a>
                            {/* Card end */}
                          </div>
                          <div className="column is-4">
                            {/* Card start */}
                            <a className="card tabsub_cont" href="#">
                              <h4>SARS-CoV-2 Reduction</h4>
                              <p>Novaerus Defend 1050 was shown to reduce MS2 bacteriophage, a surrogate for SARS-CoV-2, by 99.99% in 15 minutes.</p>
                              <h6>TAGS: NV1050, Aerosol, Virus, MS2, SARS-CoV, SARS-CoV-2, COVID-19</h6>
                              <div className="has-text-right">
                                <span>Full Report</span>
                                <FontAwesomeIcon icon={faArrowAltCircleRight} size="lg" />
                              </div>
                            </a>
                            {/* Card end */}
                            {/* Card start */}
                            <a className="card tabsub_cont" href="#">
                              <h4>SARS-CoV-2 Reduction</h4>
                              <p>Novaerus Defend 1050 was shown to reduce MS2 bacteriophage, a surrogate for SARS-CoV-2, by 99.99% in 15 minutes.</p>
                              <h6>TAGS: NV1050, Aerosol, Virus, MS2, SARS-CoV, SARS-CoV-2, COVID-19</h6>
                              <div className="has-text-right">
                                <span>Full Report</span>
                                <FontAwesomeIcon icon={faArrowAltCircleRight} size="lg" />
                              </div>
                            </a>
                            {/* Card end */}
                            {/* Card start */}
                            <a className="card tabsub_cont" href="#">
                              <h4>SARS-CoV-2 Reduction</h4>
                              <p>Novaerus Defend 1050 was shown to reduce MS2 bacteriophage, a surrogate for SARS-CoV-2, by 99.99% in 15 minutes.</p>
                              <h6>TAGS: NV1050, Aerosol, Virus, MS2, SARS-CoV, SARS-CoV-2, COVID-19</h6>
                              <div className="has-text-right">
                                <span>Full Report</span>
                                <FontAwesomeIcon icon={faArrowAltCircleRight} size="lg" />
                              </div>
                            </a>
                            {/* Card end */}
                            {/* Card start */}
                            <a className="card tabsub_cont" href="#">
                              <h4>SARS-CoV-2 Reduction</h4>
                              <p>Novaerus Defend 1050 was shown to reduce MS2 bacteriophage, a surrogate for SARS-CoV-2, by 99.99% in 15 minutes.</p>
                              <h6>TAGS: NV1050, Aerosol, Virus, MS2, SARS-CoV, SARS-CoV-2, COVID-19</h6>
                              <div className="has-text-right">
                                <span>Full Report</span>
                                <FontAwesomeIcon icon={faArrowAltCircleRight} size="lg" />
                              </div>
                            </a>
                            {/* Card end */}
                          </div>
                          <div className="column is-4">
                            {/* Card start */}
                            <a className="card tabsub_cont" href="#">
                              <h4>SARS-CoV-2 Reduction</h4>
                              <p>Novaerus Defend 1050 was shown to reduce MS2 bacteriophage, a surrogate for SARS-CoV-2, by 99.99% in 15 minutes.</p>
                              <h6>TAGS: NV1050, Aerosol, Virus, MS2, SARS-CoV, SARS-CoV-2, COVID-19</h6>
                              <div className="has-text-right">
                                <span>Full Report</span>
                                <FontAwesomeIcon icon={faArrowAltCircleRight} size="lg" />
                              </div>
                            </a>
                            {/* Card end */}
                            {/* Card start */}
                            <a className="card tabsub_cont" href="#">
                              <h4>SARS-CoV-2 Reduction</h4>
                              <p>Novaerus Defend 1050 was shown to reduce MS2 bacteriophage, a surrogate for SARS-CoV-2, by 99.99% in 15 minutes.</p>
                              <h6>TAGS: NV1050, Aerosol, Virus, MS2, SARS-CoV, SARS-CoV-2, COVID-19</h6>
                              <div className="has-text-right">
                                <span>Full Report</span>
                                <FontAwesomeIcon icon={faArrowAltCircleRight} size="lg" />
                              </div>
                            </a>
                            {/* Card end */}
                            {/* Card start */}
                            <a className="card tabsub_cont" href="#">
                              <h4>SARS-CoV-2 Reduction</h4>
                              <p>Novaerus Defend 1050 was shown to reduce MS2 bacteriophage, a surrogate for SARS-CoV-2, by 99.99% in 15 minutes.</p>
                              <h6>TAGS: NV1050, Aerosol, Virus, MS2, SARS-CoV, SARS-CoV-2, COVID-19</h6>
                              <div className="has-text-right">
                                <span>Full Report</span>
                                <FontAwesomeIcon icon={faArrowAltCircleRight} size="lg" />
                              </div>
                            </a>
                            {/* Card end */}
                            {/* Card start */}
                            <a className="card tabsub_cont" href="#">
                              <h4>SARS-CoV-2 Reduction</h4>
                              <p>Novaerus Defend 1050 was shown to reduce MS2 bacteriophage, a surrogate for SARS-CoV-2, by 99.99% in 15 minutes.</p>
                              <h6>TAGS: NV1050, Aerosol, Virus, MS2, SARS-CoV, SARS-CoV-2, COVID-19</h6>
                              <div className="has-text-right">
                                <span>Full Report</span>
                                <FontAwesomeIcon icon={faArrowAltCircleRight} size="lg" />
                              </div>
                            </a>
                            {/* Card end */}
                          </div>
                        </div>                        
                      </TabPanel>
                      <TabPanel>
                        <div className="columns">
                          <div className="column is-4">
                            {/* Card start */}
                            <a className="card tabsub_cont" href="#">
                              <h4>SARS-CoV-2 Reduction</h4>
                              <p>Novaerus Defend 1050 was shown to reduce MS2 bacteriophage, a surrogate for SARS-CoV-2, by 99.99% in 15 minutes.</p>
                              <h6>TAGS: NV1050, Aerosol, Virus, MS2, SARS-CoV, SARS-CoV-2, COVID-19</h6>
                              <div className="has-text-right">
                                <span>Full Report</span>
                                <FontAwesomeIcon icon={faArrowAltCircleRight} size="lg" />
                              </div>
                            </a>
                            {/* Card end */}
                            {/* Card start */}
                            <a className="card tabsub_cont" href="#">
                              <h4>SARS-CoV-2 Reduction</h4>
                              <p>Novaerus Defend 1050 was shown to reduce MS2 bacteriophage, a surrogate for SARS-CoV-2, by 99.99% in 15 minutes.</p>
                              <h6>TAGS: NV1050, Aerosol, Virus, MS2, SARS-CoV, SARS-CoV-2, COVID-19</h6>
                              <div className="has-text-right">
                                <span>Full Report</span>
                                <FontAwesomeIcon icon={faArrowAltCircleRight} size="lg" />
                              </div>
                            </a>
                            {/* Card end */}
                            {/* Card start */}
                            <a className="card tabsub_cont" href="#">
                              <h4>SARS-CoV-2 Reduction</h4>
                              <p>Novaerus Defend 1050 was shown to reduce MS2 bacteriophage, a surrogate for SARS-CoV-2, by 99.99% in 15 minutes.</p>
                              <h6>TAGS: NV1050, Aerosol, Virus, MS2, SARS-CoV, SARS-CoV-2, COVID-19</h6>
                              <div className="has-text-right">
                                <span>Full Report</span>
                                <FontAwesomeIcon icon={faArrowAltCircleRight} size="lg" />
                              </div>
                            </a>
                            {/* Card end */}
                            {/* Card start */}
                            <a className="card tabsub_cont" href="#">
                              <h4>SARS-CoV-2 Reduction</h4>
                              <p>Novaerus Defend 1050 was shown to reduce MS2 bacteriophage, a surrogate for SARS-CoV-2, by 99.99% in 15 minutes.</p>
                              <h6>TAGS: NV1050, Aerosol, Virus, MS2, SARS-CoV, SARS-CoV-2, COVID-19</h6>
                              <div className="has-text-right">
                                <span>Full Report</span>
                                <FontAwesomeIcon icon={faArrowAltCircleRight} size="lg" />
                              </div>
                            </a>
                            {/* Card end */}
                          </div>
                          <div className="column is-4">
                            {/* Card start */}
                            <a className="card tabsub_cont" href="#">
                              <h4>SARS-CoV-2 Reduction</h4>
                              <p>Novaerus Defend 1050 was shown to reduce MS2 bacteriophage, a surrogate for SARS-CoV-2, by 99.99% in 15 minutes.</p>
                              <h6>TAGS: NV1050, Aerosol, Virus, MS2, SARS-CoV, SARS-CoV-2, COVID-19</h6>
                              <div className="has-text-right">
                                <span>Full Report</span>
                                <FontAwesomeIcon icon={faArrowAltCircleRight} size="lg" />
                              </div>
                            </a>
                            {/* Card end */}
                            {/* Card start */}
                            <a className="card tabsub_cont" href="#">
                              <h4>SARS-CoV-2 Reduction</h4>
                              <p>Novaerus Defend 1050 was shown to reduce MS2 bacteriophage, a surrogate for SARS-CoV-2, by 99.99% in 15 minutes.</p>
                              <h6>TAGS: NV1050, Aerosol, Virus, MS2, SARS-CoV, SARS-CoV-2, COVID-19</h6>
                              <div className="has-text-right">
                                <span>Full Report</span>
                                <FontAwesomeIcon icon={faArrowAltCircleRight} size="lg" />
                              </div>
                            </a>
                            {/* Card end */}
                            {/* Card start */}
                            <a className="card tabsub_cont" href="#">
                              <h4>SARS-CoV-2 Reduction</h4>
                              <p>Novaerus Defend 1050 was shown to reduce MS2 bacteriophage, a surrogate for SARS-CoV-2, by 99.99% in 15 minutes.</p>
                              <h6>TAGS: NV1050, Aerosol, Virus, MS2, SARS-CoV, SARS-CoV-2, COVID-19</h6>
                              <div className="has-text-right">
                                <span>Full Report</span>
                                <FontAwesomeIcon icon={faArrowAltCircleRight} size="lg" />
                              </div>
                            </a>
                            {/* Card end */}
                            {/* Card start */}
                            <a className="card tabsub_cont" href="#">
                              <h4>SARS-CoV-2 Reduction</h4>
                              <p>Novaerus Defend 1050 was shown to reduce MS2 bacteriophage, a surrogate for SARS-CoV-2, by 99.99% in 15 minutes.</p>
                              <h6>TAGS: NV1050, Aerosol, Virus, MS2, SARS-CoV, SARS-CoV-2, COVID-19</h6>
                              <div className="has-text-right">
                                <span>Full Report</span>
                                <FontAwesomeIcon icon={faArrowAltCircleRight} size="lg" />
                              </div>
                            </a>
                            {/* Card end */}
                          </div>
                          <div className="column is-4">
                            {/* Card start */}
                            <a className="card tabsub_cont" href="#">
                              <h4>SARS-CoV-2 Reduction</h4>
                              <p>Novaerus Defend 1050 was shown to reduce MS2 bacteriophage, a surrogate for SARS-CoV-2, by 99.99% in 15 minutes.</p>
                              <h6>TAGS: NV1050, Aerosol, Virus, MS2, SARS-CoV, SARS-CoV-2, COVID-19</h6>
                              <div className="has-text-right">
                                <span>Full Report</span>
                                <FontAwesomeIcon icon={faArrowAltCircleRight} size="lg" />
                              </div>
                            </a>
                            {/* Card end */}
                            {/* Card start */}
                            <a className="card tabsub_cont" href="#">
                              <h4>SARS-CoV-2 Reduction</h4>
                              <p>Novaerus Defend 1050 was shown to reduce MS2 bacteriophage, a surrogate for SARS-CoV-2, by 99.99% in 15 minutes.</p>
                              <h6>TAGS: NV1050, Aerosol, Virus, MS2, SARS-CoV, SARS-CoV-2, COVID-19</h6>
                              <div className="has-text-right">
                                <span>Full Report</span>
                                <FontAwesomeIcon icon={faArrowAltCircleRight} size="lg" />
                              </div>
                            </a>
                            {/* Card end */}
                            {/* Card start */}
                            <a className="card tabsub_cont" href="#">
                              <h4>SARS-CoV-2 Reduction</h4>
                              <p>Novaerus Defend 1050 was shown to reduce MS2 bacteriophage, a surrogate for SARS-CoV-2, by 99.99% in 15 minutes.</p>
                              <h6>TAGS: NV1050, Aerosol, Virus, MS2, SARS-CoV, SARS-CoV-2, COVID-19</h6>
                              <div className="has-text-right">
                                <span>Full Report</span>
                                <FontAwesomeIcon icon={faArrowAltCircleRight} size="lg" />
                              </div>
                            </a>
                            {/* Card end */}
                            {/* Card start */}
                            <a className="card tabsub_cont" href="#">
                              <h4>SARS-CoV-2 Reduction</h4>
                              <p>Novaerus Defend 1050 was shown to reduce MS2 bacteriophage, a surrogate for SARS-CoV-2, by 99.99% in 15 minutes.</p>
                              <h6>TAGS: NV1050, Aerosol, Virus, MS2, SARS-CoV, SARS-CoV-2, COVID-19</h6>
                              <div className="has-text-right">
                                <span>Full Report</span>
                                <FontAwesomeIcon icon={faArrowAltCircleRight} size="lg" />
                              </div>
                            </a>
                            {/* Card end */}
                          </div>
                        </div>                        
                      </TabPanel>
                      <TabPanel>
                        <div className="columns">
                          <div className="column is-4">
                            {/* Card start */}
                            <a className="card tabsub_cont" href="#">
                              <h4>SARS-CoV-2 Reduction</h4>
                              <p>Novaerus Defend 1050 was shown to reduce MS2 bacteriophage, a surrogate for SARS-CoV-2, by 99.99% in 15 minutes.</p>
                              <h6>TAGS: NV1050, Aerosol, Virus, MS2, SARS-CoV, SARS-CoV-2, COVID-19</h6>
                              <div className="has-text-right">
                                <span>Full Report</span>
                                <FontAwesomeIcon icon={faArrowAltCircleRight} size="lg" />
                              </div>
                            </a>
                            {/* Card end */}
                            {/* Card start */}
                            <a className="card tabsub_cont" href="#">
                              <h4>SARS-CoV-2 Reduction</h4>
                              <p>Novaerus Defend 1050 was shown to reduce MS2 bacteriophage, a surrogate for SARS-CoV-2, by 99.99% in 15 minutes.</p>
                              <h6>TAGS: NV1050, Aerosol, Virus, MS2, SARS-CoV, SARS-CoV-2, COVID-19</h6>
                              <div className="has-text-right">
                                <span>Full Report</span>
                                <FontAwesomeIcon icon={faArrowAltCircleRight} size="lg" />
                              </div>
                            </a>
                            {/* Card end */}
                            {/* Card start */}
                            <a className="card tabsub_cont" href="#">
                              <h4>SARS-CoV-2 Reduction</h4>
                              <p>Novaerus Defend 1050 was shown to reduce MS2 bacteriophage, a surrogate for SARS-CoV-2, by 99.99% in 15 minutes.</p>
                              <h6>TAGS: NV1050, Aerosol, Virus, MS2, SARS-CoV, SARS-CoV-2, COVID-19</h6>
                              <div className="has-text-right">
                                <span>Full Report</span>
                                <FontAwesomeIcon icon={faArrowAltCircleRight} size="lg" />
                              </div>
                            </a>
                            {/* Card end */}
                            {/* Card start */}
                            <a className="card tabsub_cont" href="#">
                              <h4>SARS-CoV-2 Reduction</h4>
                              <p>Novaerus Defend 1050 was shown to reduce MS2 bacteriophage, a surrogate for SARS-CoV-2, by 99.99% in 15 minutes.</p>
                              <h6>TAGS: NV1050, Aerosol, Virus, MS2, SARS-CoV, SARS-CoV-2, COVID-19</h6>
                              <div className="has-text-right">
                                <span>Full Report</span>
                                <FontAwesomeIcon icon={faArrowAltCircleRight} size="lg" />
                              </div>
                            </a>
                            {/* Card end */}
                          </div>
                          <div className="column is-4">
                            {/* Card start */}
                            <a className="card tabsub_cont" href="#">
                              <h4>SARS-CoV-2 Reduction</h4>
                              <p>Novaerus Defend 1050 was shown to reduce MS2 bacteriophage, a surrogate for SARS-CoV-2, by 99.99% in 15 minutes.</p>
                              <h6>TAGS: NV1050, Aerosol, Virus, MS2, SARS-CoV, SARS-CoV-2, COVID-19</h6>
                              <div className="has-text-right">
                                <span>Full Report</span>
                                <FontAwesomeIcon icon={faArrowAltCircleRight} size="lg" />
                              </div>
                            </a>
                            {/* Card end */}
                            {/* Card start */}
                            <a className="card tabsub_cont" href="#">
                              <h4>SARS-CoV-2 Reduction</h4>
                              <p>Novaerus Defend 1050 was shown to reduce MS2 bacteriophage, a surrogate for SARS-CoV-2, by 99.99% in 15 minutes.</p>
                              <h6>TAGS: NV1050, Aerosol, Virus, MS2, SARS-CoV, SARS-CoV-2, COVID-19</h6>
                              <div className="has-text-right">
                                <span>Full Report</span>
                                <FontAwesomeIcon icon={faArrowAltCircleRight} size="lg" />
                              </div>
                            </a>
                            {/* Card end */}
                            {/* Card start */}
                            <a className="card tabsub_cont" href="#">
                              <h4>SARS-CoV-2 Reduction</h4>
                              <p>Novaerus Defend 1050 was shown to reduce MS2 bacteriophage, a surrogate for SARS-CoV-2, by 99.99% in 15 minutes.</p>
                              <h6>TAGS: NV1050, Aerosol, Virus, MS2, SARS-CoV, SARS-CoV-2, COVID-19</h6>
                              <div className="has-text-right">
                                <span>Full Report</span>
                                <FontAwesomeIcon icon={faArrowAltCircleRight} size="lg" />
                              </div>
                            </a>
                            {/* Card end */}
                            {/* Card start */}
                            <a className="card tabsub_cont" href="#">
                              <h4>SARS-CoV-2 Reduction</h4>
                              <p>Novaerus Defend 1050 was shown to reduce MS2 bacteriophage, a surrogate for SARS-CoV-2, by 99.99% in 15 minutes.</p>
                              <h6>TAGS: NV1050, Aerosol, Virus, MS2, SARS-CoV, SARS-CoV-2, COVID-19</h6>
                              <div className="has-text-right">
                                <span>Full Report</span>
                                <FontAwesomeIcon icon={faArrowAltCircleRight} size="lg" />
                              </div>
                            </a>
                            {/* Card end */}
                          </div>
                          <div className="column is-4">
                            {/* Card start */}
                            <a className="card tabsub_cont" href="#">
                              <h4>SARS-CoV-2 Reduction</h4>
                              <p>Novaerus Defend 1050 was shown to reduce MS2 bacteriophage, a surrogate for SARS-CoV-2, by 99.99% in 15 minutes.</p>
                              <h6>TAGS: NV1050, Aerosol, Virus, MS2, SARS-CoV, SARS-CoV-2, COVID-19</h6>
                              <div className="has-text-right">
                                <span>Full Report</span>
                                <FontAwesomeIcon icon={faArrowAltCircleRight} size="lg" />
                              </div>
                            </a>
                            {/* Card end */}
                            {/* Card start */}
                            <a className="card tabsub_cont" href="#">
                              <h4>SARS-CoV-2 Reduction</h4>
                              <p>Novaerus Defend 1050 was shown to reduce MS2 bacteriophage, a surrogate for SARS-CoV-2, by 99.99% in 15 minutes.</p>
                              <h6>TAGS: NV1050, Aerosol, Virus, MS2, SARS-CoV, SARS-CoV-2, COVID-19</h6>
                              <div className="has-text-right">
                                <span>Full Report</span>
                                <FontAwesomeIcon icon={faArrowAltCircleRight} size="lg" />
                              </div>
                            </a>
                            {/* Card end */}
                            {/* Card start */}
                            <a className="card tabsub_cont" href="#">
                              <h4>SARS-CoV-2 Reduction</h4>
                              <p>Novaerus Defend 1050 was shown to reduce MS2 bacteriophage, a surrogate for SARS-CoV-2, by 99.99% in 15 minutes.</p>
                              <h6>TAGS: NV1050, Aerosol, Virus, MS2, SARS-CoV, SARS-CoV-2, COVID-19</h6>
                              <div className="has-text-right">
                                <span>Full Report</span>
                                <FontAwesomeIcon icon={faArrowAltCircleRight} size="lg" />
                              </div>
                            </a>
                            {/* Card end */}
                            {/* Card start */}
                            <a className="card tabsub_cont" href="#">
                              <h4>SARS-CoV-2 Reduction</h4>
                              <p>Novaerus Defend 1050 was shown to reduce MS2 bacteriophage, a surrogate for SARS-CoV-2, by 99.99% in 15 minutes.</p>
                              <h6>TAGS: NV1050, Aerosol, Virus, MS2, SARS-CoV, SARS-CoV-2, COVID-19</h6>
                              <div className="has-text-right">
                                <span>Full Report</span>
                                <FontAwesomeIcon icon={faArrowAltCircleRight} size="lg" />
                              </div>
                            </a>
                            {/* Card end */}
                          </div>
                        </div>                        
                      </TabPanel>
                    </div>
                  </div>
                </Tabs>              
            </div>
          </div>
        </div>



      </div>
    </div>
  )
}

ResearchPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const ResearchPage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <ResearchPageTemplate
        image={post.frontmatter.image}
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        content={post.html}
      />
    </Layout>
  )
}

ResearchPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default ResearchPage

export const researchPageQuery = graphql`
  query ResearchPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
