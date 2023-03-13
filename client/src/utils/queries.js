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

export const QUERY_ALL_ITEMS = gql`
	query ExampleQuery {
		items {
			_id
			title
			location
			ask
			datePosted
			photos
			tags {
				_id
				name
				color
			}
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
	  bookmarkedItems {
		_id
		ask
		datePosted
		location
		photos
		tags {
		  _id
		  color
		  name
		}
		title
	  }
	  displayName
	  email
	  interests {
		_id
		color
		name
	  }
	  purchasedItems {
		_id
		ask
		datePosted
		location
		photos
		title
		tags {
		  _id
		  color
		  name
		}
	  }
	  sellingItems {
		_id
		ask
		datePosted
		location
		photos
		tags {
		  _id
		  color
		  name
		}
		title
	  }
	  chats {
		_id
	  }
	}
  }
`;

// gql`
// {
// 	user {
// 		_id
// 		bookmarkedItems
// 		sellingItems
// 		purchasedItems
// 		displayName
// 		email
		// Chats {
		// 	chat {
		// 		_id
		// 	}
		// }
		// Interests {
		// 	tag {
		// 		_id
		// 		name
		// 	}
		// }
// 	}
// }
// `;

