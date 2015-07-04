(function () {

    'use strict';
    var app = angular.module('tclassified');


    app.directive("fileUploader", function() {
        var linkFunction = function(scope, element, attributes) {

            var uploadCount = 0;
            var maxUploads = 4;
            var maxFileSize = 2500000;
            var acceptFileTypes = /^image\/(gif|jpe?g|png)$/i;

            var uploadErrors = [];
            var uploadReady = true;
            var allFiles = [];

            var url = window.location.hostname === 'blueimp.github.io' ?
            '//jquery-file-upload.appspot.com/' : 'img/useruploads/',
            uploadButton = $('<div/>')
            .addClass('btn btn-default btn-sm uploadBtn')
            .prop('disabled', true)
            .text('Processing...')
            .on('click', function () {
                var $this = $(this),
                data = $this.data(),
                divIndex = $this.parent().parent().index(),
                file = allFiles[divIndex];
                //validation

                if (uploadCount >= maxUploads) {
                    uploadErrors.push(' cannot be uploaded because you have reached the max number of uploads');
                }
                if(!acceptFileTypes.test(file.type)) {
                    uploadErrors.push(' is not an accepted file type');
                }
                if(file.size > maxFileSize) {
                    uploadErrors.push(' exceeds the maximum file size.');
                }

                if(uploadErrors.length > 0) {
                    uploadReady = false;
                } else {
                    uploadReady = true;
                }

                if (uploadReady == false){
                    $this.parent().parent().remove();

                    //update error block
                    $('.errorBlock')
                    .css({
                        'max-height':'200px',
                        'background-color': '#f2dede',
                        'border-color': '#ebccd1'
                    })
                    .html("<p class='help-block'>" + file.name + uploadErrors[0] + "</p>");
                    
                    allFiles.splice(divIndex,1);
                    uploadErrors = [];
                    return;
                };
                
                $this.off('click').text('Abort').on('click', function () {
                    $this.remove();
                    data.abort();
                });

                data.submit().always(function () {
                    $this.remove();
                    //resets error for next upload
                    uploadErrors = [];
                });
            });
            $('#fileupload').fileupload({
                
                url: url,
                dataType: 'json',
                autoUpload: false,
            
                maxFileSize: 999000, //999 KB
                // Enable image resizing, except for Android and Opera,
                // which actually support image resizing, but fail to
                // send Blob objects via XHR requests:
                disableImageResize: /Android(?!.*Chrome)|Opera/
                .test(window.navigator.userAgent),
                previewMaxWidth: 100,
                previewMaxHeight: 100,
                previewCrop: true
            }).on('fileuploadadd', function (e, data) {
                data.context = $('<div/>').addClass('thumbnailDiv').appendTo('#files');
                $.each(data.files, function (index, file) {
                    var node = $('<p/>')
                    .append($('<span/>').text(file.name));
                    if (!index) {
                        node
                        .append('<br>')
                        .append(uploadButton.clone(true).data(data));
                    }
                    node.appendTo(data.context);  
                    allFiles.push(file);                  
                });
                
                
            }).on('fileuploadprocessalways', function (e, data) {
                var index = data.index,
                file = data.files[index],
                node = $(data.context.children()[index]);
                if (file.preview) {
                    node
                    .prepend('<br>')
                    .prepend(file.preview);
                }
                if (file.error) {
                    node
                    .append('<br>')
                    .append($('<span class="text-danger"/>').text(file.error));
                }
                if (index + 1 === data.files.length) {
                    data.context.find('.uploadBtn')
                    .html('<span class="fa fa-upload"></span> Upload')
                    .prop('disabled', !!data.files.error);
                }
            }).on('fileuploadprogressall', function (e, data) {
                var progress = parseInt(data.loaded / data.total * 100, 10);
                $('#progress .progress-bar').css(
                    'width',
                    progress + '%'
                );
            }).on('fileuploaddone', function (e, data) {
                $.each(data.result.files, function (index, file) {
                    if (file.url) {
                        //take out this comment to make the thumbnail a link
                        var link = $('<a>')
                        .attr('target', '_blank')
                        .prop('href', file.url);
                        $(data.context.children()[index])
                        .wrap(link);
                    } else if (file.error) {
                        var error = $('<span class="text-danger"/>').text(file.error);
                        $(data.context.children()[index])
                        .append('<br>')
                        .append(error);
                    }
                    console.log("uploaded " + file.name);
                    scope.newListing.images.push(file.name);
                    console.log(scope.newListing.images);
                    // console.log(file);
                    // console.log(data.context);

                    //count uploaded files
                    if (uploadCount >= maxUploads){
                        ///do nothing
                    } else {
                        uploadCount=uploadCount + 1;
                    }
                    console.log('uploadCount: ' + uploadCount);

                    //Append delete button
                    $('<div/>')
                    .addClass('delete')
                    .attr({
                        'data-type':file.deleteType,
                        'data-url':file.deleteUrl,
                        'id':file.name
                    })
                    .html('<i class="fa fa-times"></i>')
                    .appendTo(data.context);
                    
                    //reset errorBlock
                    $('.errorBlock')
                    .css({
                        'max-height':'0px',
                        'background-color': 'transparent',
                        'border-color': 'transparent'
                    });
                });
            }).on('fileuploadfail', function (e, data) {
                $.each(data.files, function (index) {
                    var error = $('<span class="text-danger"/>').text('File upload failed.');
                    $(data.context.children()[index])
                    .append('<br>')
                    .append(error);
                });
            }).prop('disabled', !$.support.fileInput)
            .parent().addClass($.support.fileInput ? undefined : 'disabled');

            $('#files').on('click', '.delete', function (e) {
                e.preventDefault();

                var $link = $(this);
                var req = $.ajax({
                    dataType: 'json',
                    url: $link.data('url'),
                    type: 'DELETE'
                });

                req.success(function () {

                    //remove file from all Files array
                    var divIndex = $link.parent().index();
                    allFiles.splice(divIndex,1);

                    //remove thumbnail div
                    $link[0].parentElement.remove();

                    //redefines the newlisting object and removes the image that was just deleted
                    scope.newListing.images = $.grep(scope.newListing.images, function(value) {
                      return value != $link[0].id;
                    });

                    //reset errorBlock
                    $('.errorBlock')
                    .css({
                        'max-height':'0px',
                        'background-color': 'transparent',
                        'border-color': 'transparent'
                    });

                    //updates count
                    uploadCount = uploadCount - 1;
                    console.log($link[0].id + 'was successfully deleted.','  uploadCount: ' + uploadCount );
                });
            });

            scope.deleteUploads = function(){
                $('.delete').click();
            }
            $('.deleteAll').click(function(){
                $('.delete').click();
            });


            $('#files').on('click','.uploadBtn', function(){
               
            });




        };

        return {
            restrict: "E",
            templateUrl: "app/newlisting/fileUploader.html",
            link: linkFunction
        };
    });
}());
