import { gql } from "@apollo/client";

export const QUERY_ITEMS = gql`
	query getItems($tag: ID) {
		items(tag: $tag) {
			_id
			title
			photos
			Location
			datePosted
			ask
			tag {
				_id
			}
		}
	}
`;

export const QUERY_TAGS = gql`
	{
		tags {
			_id
			name
			color
		}
	}
`;

export const QUERY_SINGLE_ITEM = gql`
	{
		items {
			_id
			title
			photos
			Location
			datePosted
			ask
			tag {
				_id
				name
				color
			}
		}
	}
`;

export const QUERY_USER = gql`
	{
		user {
			_id
			bookmarkedItems
			sellingItems
			purchasedItems
			displayName
			email
			password
			Chats {
				chat {
					_id
				}
			}
			Interests {
				tag {
					_id
					name
				}
			}
		}
	}
`;
