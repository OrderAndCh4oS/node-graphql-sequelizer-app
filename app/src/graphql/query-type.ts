import {GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString} from 'graphql';
import model from "../model";

// Todo: Look into implementing https://github.com/mickhansen/graphql-sequelize
// Todo: Look into implementing https://github.com/mickhansen/dataloader-sequelize

const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'Users of the App',
    // @ts-ignore
    fields: {
        id: {type: GraphQLInt},
        username: {type: GraphQLString},
    }
});

const QueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'The root query type.',
    // @ts-ignore
    fields: {
        hello: {
            type: GraphQLString,
            resolve() {
                return 'HELLO!!'
            }
        },
        user: {
            type: UserType,
            args: {
                id: {
                    type: GraphQLNonNull(GraphQLInt),
                    description: 'User id'
                }
            },
            resolve(_, args) {
                return model.user.findByPk(args.id);
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve() {
                return model.user.findAll({attributes: ['id', 'username']});
            }
        }
    }
});

export default QueryType;