App.factory 'ArtistsFactory', ($http)->

  Artist = ()->

  Artist.prototype.fetch = ()->
    $http {
      method: 'get',
      url: 'http://edcat2.sites.djangoeurope.com/api/persons/'
    }

  Artist.prototype.save = (data)->

  Artist