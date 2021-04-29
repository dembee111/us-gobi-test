import gql from 'graphql-tag';

export const createCheckout = gql`
  mutation checkoutCreate($input: CheckoutCreateInput!, $currencyCode: CurrencyCode!) {
    checkoutCreate(input: $input) {
      userErrors {
        message
        field
      }
      checkout {
        id
        webUrl
        totalTax
        subtotalPriceV2 {
          amount
        }
        totalPriceV2 {
          amount
        }
        lineItems(first: 250) {
          edges {
            node {
              id
              title
              variant {
                id
                title
                sku
                quantityAvailable
                image {
                  altText
                  src
                }
                selectedOptions {
                  name
                  value
                }
                presentmentPrices(first: 1, presentmentCurrencies: [$currencyCode]) {
                  edges {
                    node {
                      compareAtPrice {
                        amount
                        currencyCode
                      }
                      price {
                        amount
                        currencyCode
                      }
                    }
                  }
                }
                product {
                  id
                  handle
                  title
                  productType
                  tags
                  variants(first: 100) {
                    edges {
                      node {
                        id
                        title
                        quantityAvailable
                        availableForSale
                        selectedOptions {
                          name
                          value
                        }
                      }
                    }
                  }
                }
              }
              quantity
            }
          }
        }
      }
    }
  }
`;

export const checkoutLineItemsReplace = gql`
  mutation checkoutLineItemsReplace(
    $lineItems: [CheckoutLineItemInput!]!
    $checkoutId: ID!
    $currencyCode: CurrencyCode!
  ) {
    checkoutLineItemsReplace(lineItems: $lineItems, checkoutId: $checkoutId) {
      userErrors {
        code
        field
        message
      }
      checkout {
        id
        webUrl
        totalTax
        subtotalPriceV2 {
          amount
        }
        totalPriceV2 {
          amount
        }
        lineItems(first: 250) {
          edges {
            node {
              id
              title
              variant {
                id
                title
                sku
                quantityAvailable
                image {
                  altText
                  src
                }
                selectedOptions {
                  name
                  value
                }
                presentmentPrices(first: 1, presentmentCurrencies: [$currencyCode]) {
                  edges {
                    node {
                      compareAtPrice {
                        amount
                        currencyCode
                      }
                      price {
                        amount
                        currencyCode
                      }
                    }
                  }
                }
                product {
                  id
                  handle
                  title
                  productType
                  tags
                  variants(first: 100) {
                    edges {
                      node {
                        id
                        title
                        quantityAvailable
                        availableForSale
                        selectedOptions {
                          name
                          value
                        }
                      }
                    }
                  }
                }
              }
              quantity
            }
          }
        }
      }
    }
  }
`;

export const customerAccessTokenCreate = gql`
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

export const checkoutCustomerAssociateV2 = gql`
  mutation checkoutCustomerAssociateV2($checkoutId: ID!, $customerAccessToken: String!, $currencyCode: CurrencyCode!) {
    checkoutCustomerAssociateV2(checkoutId: $checkoutId, customerAccessToken: $customerAccessToken) {
      checkout {
        id
        webUrl
        totalTax
        subtotalPriceV2 {
          amount
        }
        totalPriceV2 {
          amount
        }
        lineItems(first: 250) {
          edges {
            node {
              id
              title
              variant {
                id
                title
                sku
                quantityAvailable
                image {
                  altText
                  src
                }
                selectedOptions {
                  name
                  value
                }
                presentmentPrices(first: 1, presentmentCurrencies: [$currencyCode]) {
                  edges {
                    node {
                      compareAtPrice {
                        amount
                        currencyCode
                      }
                      price {
                        amount
                        currencyCode
                      }
                    }
                  }
                }
                product {
                  id
                  handle
                  title
                  productType
                  tags
                  variants(first: 100) {
                    edges {
                      node {
                        id
                        title
                        quantityAvailable
                        availableForSale
                        selectedOptions {
                          name
                          value
                        }
                      }
                    }
                  }
                }
              }
              quantity
            }
          }
        }
      }
      checkoutUserErrors {
        code
        field
        message
      }
    }
  }
`;

export const checkoutShippingAddressUpdateV2 = gql`
  mutation checkoutShippingAddressUpdateV2($shippingAddress: MailingAddressInput!, $checkoutId: ID!) {
    checkoutShippingAddressUpdateV2(shippingAddress: $shippingAddress, checkoutId: $checkoutId) {
      checkout {
        id
      }
      checkoutUserErrors {
        code
        field
        message
      }
    }
  }
`;

export const customerAddressCreate = gql`
  mutation customerAddressCreate($customerAccessToken: String!, $address: MailingAddressInput!) {
    customerAddressCreate(customerAccessToken: $customerAccessToken, address: $address) {
      customerAddress {
        id
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

export const customerDefaultAddressUpdate = gql`
  mutation customerDefaultAddressUpdate($customerAccessToken: String!, $addressId: ID!) {
    customerDefaultAddressUpdate(customerAccessToken: $customerAccessToken, addressId: $addressId) {
      customer {
        id
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;
export const customerCreate = gql`
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

export const customerAddressUpdate = gql`
  mutation customerAddressUpdate($customerAccessToken: String!, $id: ID!, $address: MailingAddressInput!) {
    customerAddressUpdate(customerAccessToken: $customerAccessToken, id: $id, address: $address) {
      customerAddress {
        id
      }
    }
  }
`;

export const customerAddressDelete = gql`
  mutation customerAddressDelete($id: ID!, $customerAccessToken: String!) {
    customerAddressDelete(id: $id, customerAccessToken: $customerAccessToken) {
      customerUserErrors {
        code
        field
        message
      }
      deletedCustomerAddressId
    }
  }
`;

export const customerUpdate = gql`
  mutation customerUpdate($customerAccessToken: String!, $customer: CustomerUpdateInput!) {
    customerUpdate(customerAccessToken: $customerAccessToken, customer: $customer) {
      customer {
        id
      }
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

export const customerUpdateEmail = gql`
  mutation customerUpdate($customerAccessToken: String!, $customer: CustomerUpdateInput!) {
    customerUpdate(customerAccessToken: $customerAccessToken, customer: $customer) {
      customer {
        id
        email
      }
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

export const customerUpdateNewsletter = gql`
  mutation customerUpdate($customerAccessToken: String!, $customer: CustomerUpdateInput!) {
    customerUpdate(customerAccessToken: $customerAccessToken, customer: $customer) {
      customer {
        id
        acceptsMarketing
      }
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

export const customerRecover = gql`
  mutation customerRecover($email: String!) {
    customerRecover(email: $email) {
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

export const customerActivate = gql`
  mutation customerActivate($id: ID!, $input: CustomerActivateInput!) {
    customerActivate(id: $id, input: $input) {
      customer {
        id
      }
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

export const customerReset = gql`
  mutation customerReset($id: ID!, $input: CustomerResetInput!) {
    customerReset(id: $id, input: $input) {
      customer {
        id
      }
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

export const expressCheckout = gql`
  mutation checkoutCreate($input: CheckoutCreateInput!) {
    checkoutCreate(input: $input) {
      checkout {
        webUrl
      }
    }
  }
`;
