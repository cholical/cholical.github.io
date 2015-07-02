(function () {

'use strict';
var app = angular.module('tclassified');


app.directive("fileUploader", function() {
  var linkFunction = function(scope, element, attributes) {
        console.log('file uploader initialized');
        console.log(scope);
        console.log(element);
        console.log(attributes);

      	$('#fileupload').fileupload({
      		dataType: 'json',
            autoUpload: false,
            acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
            maxFileSize: 999000,
            paramName: 'files[]',
            url:"img/useruploads/",
            add: function (e, data) {
                data.context = $('.uploadQueue').click(function () {
                        data.context = $('<p/>').text('Uploading...').replaceAll($(this));
                        data.submit();
                    });
            },
      		done: function (e, data) {
      			$.each(data.result.files, function (index, file) {

      				console.log("uploaded " + file.name);

                    scope.newListing.images.push(file.name);
                    console.log(scope.newListing.images);
                    console.log(file);
      			});
      		}
      	}).on('fileuploadadd', function (e, data) {
              data.context = $('<div/>').appendTo('#files');
              $.each(data.files, function (index, file) {
                  var node = $('<p/>')
                          .append($('<span/>').text(file.name));
                  if (!index) {
                      node
                          .append("<button class='deleteImgQueue'>Remove</button>")
                  }
                  node.appendTo(data.context);

              });
          });
  };

    return {
      restrict: "E",
      templateUrl: "app/newlisting/fileUploader.html",
      link: linkFunction

    };

  });
}());
