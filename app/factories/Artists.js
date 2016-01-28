App.factory('ArtistsFactory', function($http) {
  var Artist;
  Artist = function() {};
  Artist.prototype.fetch = function() {
    return $http({
      method: 'get',
      url: 'http://edcat2.sites.djangoeurope.com/api/persons/'
    });
  };
  Artist.prototype.save = function(data) {};
  return Artist;
});
