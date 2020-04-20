var cassandra = require('cassandra-driver');

module.exports = new cassandra.Client({
  contactPoints: ['127.0.0.1'],
  localDataCenter: 'datacenter1',
  keyspace: 'ks1'
});