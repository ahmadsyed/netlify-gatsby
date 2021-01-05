import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

export const GridPageTemplate = ({ 
  image, 
  title, 
  content, 
  contentComponent 
}) => {
  const PageContent = contentComponent || Content

  return (
    <div className="content">
      <div
        className="full-width-image-container margin-top-0"
        style={{
          backgroundImage: `url(${
            !!image.childImageSharp ? image.childImageSharp.fluid.src : image
          })`
        }}>
        <h2
          className="has-text-weight-bold is-size-1"
          style={{
            boxShadow: '0.5rem 0 0 rgba(0, 0, 0, 0.75), -0.5rem 0 0 rgba(0, 0, 0, 0.75)',
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            color: 'white',
            padding: '1rem'
          }}>
          {title}
        </h2>
      </div>
      
      <div className="container">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="section">
              <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
                {title}
              </h2>
              <PageContent className="content" content={content} />
            </div>
          </div>
        </div>
        </div>
        <div className="container grid-system">
            <div className="columns">
              <div className="column is-4">
                Column 4
              </div>
              <div className="column is-4">
                Column 4
              </div>
              <div className="column is-4">
                Column 4
              </div>
            </div>
            <div className="columns">
              <div className="column is-3">
                Column 3
              </div>
              <div className="column is-3">
                Column 3
              </div>
              <div className="column is-3">
                Column 3
              </div>
              <div className="column is-3">
                Column 3
              </div>
            </div>
            <div className="columns">
              <div className="column is-6">
                Column 6
              </div>
              <div className="column is-6">
                Column 6
              </div>
            </div>
            <div className="columns">
              <div className="column is-8">
                Colum 8
              </div>
              <div className="column is-4">
                Colum 4
              </div>
            </div>
            <div className="columns">
              <div className="column is-7">
                Column 7
              </div>
              <div className="column is-5">
                Column 5
              </div>
            </div>
            <div className="columns">
              <div className="column is-9">
                Column 9
              </div>
              <div className="column is-3">
                Column 3
              </div>
            </div>
            <div className="columns">
              <div className="column is-10">
                Column 10
              </div>
              <div className="column is-2">
                Column 2
              </div>
            </div>

            <div className="columns">
              <div className="column is-10">
                Column 10
              </div>
              <div className="column is-2">
                Column 2
              </div>
            </div>
            {/* Offset ////////////////////////////////////////////////////////////////////////////////////// */}
            <h2>Offset</h2>
            <div className="columns">
              <div className="column is-offset-1">
                <p className="bd-notification is-primary">.is-offset-1</p>
              </div>
            </div>
            <div className="columns">
              <div className="column is-offset-2">
                <p className="bd-notification is-primary">.is-offset-2</p>
              </div>
            </div>
            <div className="columns">
              <div className="column is-offset-3">
                <p className="bd-notification is-primary">.is-offset-3</p>
              </div>
            </div>
            <div className="columns">
              <div className="column is-offset-4">
                <p className="bd-notification is-primary">.is-offset-4</p>
              </div>
            </div>
            <div className="columns">
              <div className="column is-offset-5">
                <p className="bd-notification is-primary">.is-offset-5</p>
              </div>
            </div>
            <div className="columns">
              <div className="column is-offset-6">
                <p className="bd-notification is-primary">.is-offset-6</p>
              </div>
            </div>
            <div className="columns">
              <div className="column is-offset-7">
                <p className="bd-notification is-primary">.is-offset-7</p>
              </div>
            </div>
            <div className="columns">
              <div className="column is-offset-8">
                <p className="bd-notification is-primary">.is-offset-8</p>
              </div>
            </div>
            <div className="columns">
              <div className="column is-offset-9">
                <p className="bd-notification is-primary">.is-offset-9</p>
              </div>
            </div>
            <div className="columns">
              <div className="column is-offset-10">
                <p className="bd-notification is-primary">.is-offset-10</p>
              </div>
            </div>
            <div className="columns">
              <div className="column is-offset-11">
                <p className="bd-notification is-primary">.is-offset-11</p>
              </div>
            </div>
            {/* Offset ////////////////////////////////////////////////////////////////////////////////////// */}
            <h2>Buttons</h2>
            <div className="buttons">
              <button className="button is-info">Info</button>
              <button className="button is-success">Success</button>
              <button className="button is-warning">Warning</button>
              <button className="button is-danger">Danger</button>
            </div>

          </div>
      
    </div>
  )
}

GridPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const GridPage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <GridPageTemplate
        image={post.frontmatter.image}
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        content={post.html}
      />
    </Layout>
  )
}

GridPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default GridPage

export const gridPageQuery = graphql`
  query GridPage($id: String!) {
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
