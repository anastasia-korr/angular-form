App.controller('FormCtrl', function($scope, $http, $uibModal, ArtistsFactory) {
  var Artists;
  Artists = new ArtistsFactory();
  Artists.fetch().then(function(data) {
    return console.log(data);
  });
  $scope.artists = [];
  $scope.publishers = [];
  $scope.categories = [
    {
      name: 'Artists’ Books',
      id: 1
    }, {
      name: 'Artists’ Editions',
      id: 2
    }
  ];
  $scope.selectedArtists = [];
  $scope.selectedPublishers = [];
  $scope.tagTransform = function(newTag) {
    return {
      text: newTag
    };
  };
  $scope.$watch('selectedArtists', function(newV) {
    return console.log(newV);
  }, true);
  $scope.refresh = function(query, type) {
    if (query == null) {
      query = '';
    }
    if (type == null) {
      type = '';
    }
    return $http({
      method: 'get',
      url: 'http://edcat2.sites.djangoeurope.com/search/autocomplete/',
      params: {
        q: query,
        type: type
      }
    }).then(function(response) {
      if (response.data.results.length) {
        return $scope[type] = response.data.results.map(function(e, i) {
          return e = {
            text: e,
            id: i,
            isExist: true
          };
        });
      } else {
        if (type === "artists") {
          return $scope[type] = [
            {
              isNew: true,
              text: 'new',
              id: 0
            }
          ];
        } else {
          return $scope[type] = [];
        }
      }
    });
  };
  $scope.createNew = function($event, obj) {
    var createArtistInstance;
    $event.preventDefault();
    return createArtistInstance = $uibModal.open({
      animation: true,
      templateUrl: 'tpl/ui-create-artist.html',
      controller: 'createArtistInstanceCtrl',
      resolve: {
        selectedItems: function() {
          var set;
          set = function(newItem) {
            return $scope.selectedArtists.push(newItem);
          };
          return {
            set: set
          };
        },
        items: function() {
          var set;
          set = function(newItem) {
            return $scope.artists.push(newItem);
          };
          return {
            set: set
          };
        }
      }
    });
  };
  return $scope.Create = function() {
    return $http.post('http://edcat2.sites.djangoeurope.com/items/new/').then(function() {
      return console.log(arguments);
    });
  };
});

App.controller('createArtistInstanceCtrl', function($scope, $uibModalInstance, selectedItems, items) {
  $scope.NewArtist = {};
  return $scope.save = function() {
    var NewItem;
    NewItem = {
      text: $scope.isGroup ? $scope.NewArtist.GroupName : $scope.NewArtist.FirstName + ' ' + $scope.NewArtist.LastName
    };
    selectedItems.set(NewItem);
    items.set(NewItem);
    return $uibModalInstance.close(items);
  };
});
