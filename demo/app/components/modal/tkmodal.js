/**
 * Modal
 * @constructor
 *
 let modal = new TKModal();
 modal.alert({message: "Hello world!"});

 */
"use strict";
var TKModal = (function () {
    function TKModal() {
        this.isActive = false;
    }
    /**
     * Change the state of the modal
     * @param state {Boolean}
     */
    TKModal.prototype.setModalActive = function (state) {
        this.isActive = state;
    };
    /**
     * Change the state of the modal
     */
    TKModal.prototype.getModalActive = function () {
        return this.isActive;
    };
    /**
     * This method will get you modal and mask.
     * @param options
     * @returns {HTMLElement} DOM Modal Inner part.
     */
    TKModal.prototype.getModal = function (options) {
        this.setModalActive(true);
        this.createMask();
        document.addEventListener('keyup', function onEscape(e) {
            if (e.keyCode == 27) {
                this.destroyModal();
            }
            document.removeEventListener('keyup', onEscape);
        }.bind(this));
        return this.createModal(options);
    };
    /**
     * Create mask and store it inside the class.
     * @returns {HTMLElement}
     */
    TKModal.prototype.createMask = function () {
        var mask = document.createElement('div');
        mask.classList.add('tk-modal-mask', 'fadein');
        document.body.appendChild(mask);
        //TODO: find a better way to store mask in class
        this.mask = mask;
        return mask;
    };
    /**
     * Create modal and store it inside the class.
     * @param options
     * @returns {HTMLElement}
     */
    TKModal.prototype.createModal = function (options) {
        var modal = document.createElement('div'), modalInner = document.createElement('div'), messageNode = document.createElement('div'), message = options && options.message || 'Hello there!!!';
        modal.classList.add('tk-modal');
        modal.appendChild(modalInner);
        messageNode.classList.add('modal-content');
        messageNode.innerHTML = message;
        modalInner.classList.add('modal-box', 'open-confirm-modal');
        options && options.className && modalInner.classList.add(options.className);
        modalInner.appendChild(messageNode);
        document.body.appendChild(modal);
        //TODO: find a better way to store modal in class
        this.modal = modalInner;
        return modalInner;
    };
    /**
     *
     * @param options
     */
    TKModal.prototype.getAlertModal = function (options) {
        var button = [{
                label: 'Okay', value: null
            }];
        this
            .getModal(options)
            .appendChild(this.getModalButtons(button));
        document.getElementById('modal-button-okay').focus();
    };
    /**
     * Get special type of Modal (Confirm Modal).
     * @param options
     * @param callback
     */
    TKModal.prototype.getConfirmModal = function (options, callback) {
        var buttons = [
            { label: 'No', value: false },
            { label: 'Yes', value: true }
        ];
        this
            .getModal(options)
            .appendChild(this.getModalButtons(buttons, callback));
        document.getElementById('modal-button-yes').focus();
    };
    /**
     * Get buttons for Confirm Modal.
     * @param buttons
     * @param callback
     * @returns {HTMLElement}
     */
    TKModal.prototype.getModalButtons = function (buttons, callback) {
        if (callback === void 0) { callback = null; }
        var buttonsWrapper = document.createElement('div');
        buttons.forEach(function (button) {
            var that = this, newButton = document.createElement('button');
            newButton.innerHTML = button.label;
            newButton.setAttribute('id', 'modal-button-' + button.label.toLowerCase());
            newButton.addEventListener('click', function onClick() {
                typeof callback === 'function' && callback(button.value);
                that.destroyModal();
                removeEventListener('click', onClick);
            });
            buttonsWrapper.appendChild(newButton);
        }, this);
        buttonsWrapper.className = 'buttons-wrapper';
        return buttonsWrapper;
    };
    /**
     * Main method to call for Confirm Modal.
     * @param options
     * @param callback
     */
    TKModal.prototype.confirm = function (options, callback) {
        this.getConfirmModal(options, function (value) {
            typeof callback === "function" && callback(value);
        }.bind(this));
    };
    /**
     * Main method to call for alert Modal.
     * @param options
     */
    TKModal.prototype.alert = function (options) {
        this.getAlertModal(options);
    };
    /**
     * Destroy Mask and Modal.
     */
    TKModal.prototype.destroyModal = function () {
        var modal = this.modal, mask = this.mask;
        modal.classList.add('close-confirm-modal');
        mask.classList.add('fadeout');
        setTimeout(function () {
            if (this.getModalActive()) {
                modal.parentNode.removeChild(modal);
                mask.parentNode.removeChild(mask);
                this.setModalActive(false);
            }
        }.bind(this), 500);
    };
    return TKModal;
}());
exports.TKModal = TKModal;
//# sourceMappingURL=tkmodal.js.map