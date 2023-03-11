import { gql } from '@apollo/client';

export const LOGIN  = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
            }
        }
    }
`;

export const ADD_ITEM = gql`

`;

export const ADD_USER = gql`

`;

export const REMOVE_ITEM = gql`

`;

export const REMOVE_