import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

const IndexPage = () => (
  <div>
    <Helmet>
      <title>About</title>
    </Helmet>
    <h1>About CPS</h1>
    <p>Custom programming solutions is a high end consulting firm that leverages technology to solve problems.
    </p>
    <p>
    With many decades of collective experience in Business and technology we are well placed to deliver real gains on technology projects.
    </p>
    <p>
    One of the biggest advantages we can bring as a result of our experience is knowing what our capabilites are.
    In house we have experience with IT management, tech industry business strategy, project management, process improvement.
    We also have in house technical skills in content management systems, data analysis, advanced Python development including internals and performance engineering, web development, data analysis, embedded systems.
    We have a large network of professionals we partner with on projects, we regularly work with graphic designers and content writers along with other professionals that complement our core skills.
    With this network we can refer on work to others we know if we are too busy to do it ourselves.
    </p>
    <p>
    If you would like to see some of the open source code we have contributed have a look at our <a href="https://github.com/customprogrammingsolutions">GitHub page</a>
    </p>
  </div>
)

export default IndexPage