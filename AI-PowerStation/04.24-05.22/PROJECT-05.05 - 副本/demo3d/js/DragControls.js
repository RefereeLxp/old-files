/*
 * @author zz85 / https://github.com/zz85
 * @author mrdoob / http://mrdoob.com
 * Running this will allow you to drag three.js objects around the screen.
 */

THREE.DragControls = function ( _objects, _camera, _domElement,surface ) {

	if ( _objects instanceof THREE.Camera ) {

		console.warn( 'THREE.DragControls: Constructor now expects ( objects, camera, domElement )' );
		var temp = _objects; _objects = _camera; _camera = temp;

	}

	var _plane = new THREE.Plane();
	var _raycaster = new THREE.Raycaster();

	var _mouse = new THREE.Vector2();
	var _offset = new THREE.Vector3();
	var _intersection = new THREE.Vector3();

	var _selected = null, _hovered = null;
	var offsetHeight = 0;
	//

	var scope = this;

	scope.surface = surface;

	function activate() {

		_domElement.addEventListener( 'mousemove', onDocumentMouseMove, false );
		_domElement.addEventListener( 'mousedown', onDocumentMouseDown, false );
		_domElement.addEventListener( 'mouseup', onDocumentMouseUp, false );

	}

	function deactivate() {

		_domElement.removeEventListener( 'mousemove', onDocumentMouseMove, false );
		_domElement.removeEventListener( 'mousedown', onDocumentMouseDown, false );
		_domElement.removeEventListener( 'mouseup', onDocumentMouseUp, false );
		_selected = false;
		_domElement.style.cursor = 'auto';
	}

	function dispose() {

		deactivate();

	}

	function onDocumentMouseMove( event ) {

		event.preventDefault();
		if(!scope.enabled) return;

		_mouse.x = ( event.layerX / _domElement.width ) * 2 - 1;
		_mouse.y = -(event.layerY / _domElement.height) * 2 + 1;

		_raycaster.setFromCamera( _mouse, _camera );

		if ( _selected && scope.enabled ) {



			if (isData(_selected, "type", "arrowHelper").result)
			{
				if (_raycaster.ray.intersectPlane(_plane, _intersection))
				{
					var positionNow = _intersection.sub(_offset).y;
					offsetHeight =positionNow - _selected.position.y;
					_selected.position.y = positionNow;
					scope.dispatchEvent({ type: 'drag', object: _selected, offsetHeight: offsetHeight });
				}
			}
			else if (scope.surface)
			{
				var intersects = _raycaster.intersectObjects([scope.surface], true);
				if (intersects.length > 0) {
					var positionNow = intersects[0].point.sub(_offset);
					_selected.position.x = positionNow.x;
					_selected.position.z = positionNow.z;
					scope.dispatchEvent({ type: 'drag', object: _selected});
				}
			}
			else if (_raycaster.ray.intersectPlane(_plane, _intersection)) {

				_selected.position.copy(_intersection.sub(_offset));
				scope.dispatchEvent({ type: 'drag', object: _selected });
			}

			return;

		}

		_raycaster.setFromCamera( _mouse, _camera );

		var intersects = _raycaster.intersectObjects( _objects,true );

		if ( intersects.length > 0 ) {

			var object = intersects[ 0 ].object;
			var check = isData(object, "type", "arrowHelper");
			if (check.result)
			{
				//check.root.setColor('red');
				object = check.root;
				var normal = _camera.getWorldDirection();
				_plane.setFromNormalAndCoplanarPoint(new THREE.Vector3(normal.x, 0, normal.z), object.position);
			}
			else
				_plane.setFromNormalAndCoplanarPoint( _camera.getWorldDirection( _plane.normal ), object.position );

			if ( _hovered !== object ) {

				scope.dispatchEvent( { type: 'hoveron', object: object } );

				_domElement.style.cursor = 'pointer';
				_hovered = object;

			}

		} else {

			if ( _hovered !== null ) {

				scope.dispatchEvent( { type: 'hoveroff', object: _hovered } );

				_domElement.style.cursor = 'auto';
				_hovered = null;

			}

		}

	}

	function onDocumentMouseDown( event ) {

		event.preventDefault();
		if(!scope.enabled) return;
		_raycaster.setFromCamera( _mouse, _camera );

		var intersects = _raycaster.intersectObjects(_objects, true);
		if ( intersects.length > 0 ) {

			_selected = intersects[0].object;
			var check = isData(_selected, "dragable", true)
			if (check.result) {
				_selected = check.root;
			}
			if (scope.surface  && !isData(_selected, "type", "arrowHelper").result)
			{

				var intersects = _raycaster.intersectObjects([scope.surface], true);
				if (intersects.length > 0) {
					_offset.copy( intersects[0].point ).sub( _selected.position );
				}
			}else if ( _raycaster.ray.intersectPlane( _plane, _intersection ) ) {
				_offset.copy( _intersection ).sub( _selected.position );
			}

			_domElement.style.cursor = 'move';

			scope.dispatchEvent( { type: 'dragstart', object: _selected } );

		}


	}

	function onDocumentMouseUp( event ) {

		event.preventDefault();

		if ( _selected ) {

			if(scope.enabled)
				scope.dispatchEvent( { type: 'dragend', object: _selected } );

			_selected = null;

		}

		_domElement.style.cursor = 'auto';

	}

	activate();

	// API

	this.enabled = true;

	this.activate = activate;
	this.deactivate = deactivate;
	this.dispose = dispose;

	// Backward compatibility

	this.setObjects = function () {

		console.error( 'THREE.DragControls: setObjects() has been removed.' );

	};

	this.on = function ( type, listener ) {

		console.warn( 'THREE.DragControls: on() has been deprecated. Use addEventListener() instead.' );
		scope.addEventListener( type, listener );

	};

	this.off = function ( type, listener ) {

		console.warn( 'THREE.DragControls: off() has been deprecated. Use removeEventListener() instead.' );
		scope.removeEventListener( type, listener );

	};

	this.notify = function ( type ) {

		console.error( 'THREE.DragControls: notify() has been deprecated. Use dispatchEvent() instead.' );
		scope.dispatchEvent( { type: type } );

	};

};

THREE.DragControls.prototype = Object.create( THREE.EventDispatcher.prototype );
THREE.DragControls.prototype.constructor = THREE.DragControls;
