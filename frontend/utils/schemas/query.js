const LANDING_PAGE_QUERY = `query {
    landingPage {
      Video {
        url
      }
      products {
        Name
        price
        Images {
          url
        }
      }
    }
  }`;

const PRODUCT_PAGE_QUERY = `query {
    products {
      id
      Name
      Description
      price
      Images {
        url
      }
      variants {
        Packaging
      }
    }
  }
  `;

export { LANDING_PAGE_QUERY, PRODUCT_PAGE_QUERY };
