App.controller 'FormCtrl', ($scope, $http, $uibModal, ArtistsFactory)->

  Artists = new ArtistsFactory()
  Artists.fetch().then (data)->
    console.log data



  $scope.artists = []
  $scope.publishers = []

  $scope.categories = [
    {
      name: 'Artists’ Books'
      id: 1
    },
    {
      name: 'Artists’ Editions'
      id: 2
    }
  ]

  $scope.selectedArtists = []
  $scope.selectedPublishers = []

  $scope.tagTransform = (newTag)->
    {
    text: newTag
    }

  $scope.$watch 'selectedArtists', (newV)->
    console.log newV
  , on

  $scope.refresh = (query = '', type = '')->
    $http({
        method: 'get',
        url: 'http://edcat2.sites.djangoeurope.com/search/autocomplete/'
        params: {
          q: query,
          type: type
        }
      }
    ).then (response)->

      if response.data.results.length
        $scope[type] = response.data.results.map (e, i)->
          e = {
            text: e
            id: i
            isExist: on
          }
      else
        if type is "artists"
          $scope[type] = [{
            isNew: on
            text: 'new',
            id: 0
          }]
        else
          $scope[type] = []

  $scope.createNew = ($event, obj)->
    $event.preventDefault()

    createArtistInstance = $uibModal.open({
      animation: on
      templateUrl: 'tpl/ui-create-artist.html'
      controller: 'createArtistInstanceCtrl'
      resolve:
        selectedItems: ()->

          set = (newItem)->
            $scope.selectedArtists.push newItem

          {
          set: set
          }

        items: ()->

          set = (newItem)->
            $scope.artists.push newItem

          {
          set: set
          }
    })

  $scope.Create = ()->
    $http.post('http://edcat2.sites.djangoeurope.com/items/new/').then ()->
      console.log arguments

App.controller 'createArtistInstanceCtrl', ($scope, $uibModalInstance, selectedItems, items)->

  $scope.NewArtist = {}

  $scope.save = ()->

    NewItem = {
      text: if $scope.isGroup then $scope.NewArtist.GroupName else $scope.NewArtist.FirstName + ' ' + $scope.NewArtist.LastName
    }

    selectedItems.set NewItem
    items.set NewItem

    $uibModalInstance.close items
