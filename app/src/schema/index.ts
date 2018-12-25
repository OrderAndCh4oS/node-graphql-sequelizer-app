import { ObjectType, Field, Schema } from "graphene-js";

@ObjectType()
class Query {
    @Field(String, {args: {name: String}})
    hello({name}) {
        return `Jambo ${name || "stranger"}`;
    }
}

export const schema = new Schema({query: Query});

