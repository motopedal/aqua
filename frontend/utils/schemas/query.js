const LANDING_PAGE_QUERY = `query {
    landingPage {
      Video {
        url
      }
      products {
        name
        images {
          url
        }
      }
    }
  }`;

const PRODUCT_PAGE_QUERY = `query {
    products {
      id
      name
      description
      images {
        url
      }
      variants {
        id
        packaging
        price
      }
    }
  }
  `;

export { LANDING_PAGE_QUERY, PRODUCT_PAGE_QUERY };
