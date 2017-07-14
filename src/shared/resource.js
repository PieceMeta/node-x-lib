import SchemaObject from 'schema-object'

class Resource extends SchemaObject {
  constructor (schema) {
    super(
      schema,
      {
        constructors: {
          fromJSON: function (str) {
            Object.assign(this, JSON.parse(str))
          },
          fromObject: function (obj) {
            Object.assign(this, obj)
          }
        }
      },
      {
        methods: {
          toJSON: function () {
            return JSON.stringify(this.toObject())
          }
        }
      }
    )
  }
}

export default Resource
