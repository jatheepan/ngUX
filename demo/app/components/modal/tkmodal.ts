/**
 * Modal
 * @constructor
 *
 let modal = new TKModal();
 modal.alert({message: "Hello world!"});

 */

export class TKModal {
    private isActive = false;
    private mask;
    private modal;

    /**
     * Change the state of the modal
     * @param state {Boolean}
     */
    setModalActive(state) {
        this.isActive = state;
    }

    /**
     * Change the state of the modal
     */
    getModalActive() {
        return this.isActive;
    }

    /**
     * This method will get you modal and mask.
     * @param options
     * @returns {HTMLElement} DOM Modal Inner part.
     */
    getModal(options) {
        this.setModalActive(true);
        this.createMask();
        document.addEventListener('keyup', function onEscape(e) {
            if (e.keyCode == 27) {
                this.destroyModal();
            }
            document.removeEventListener('keyup', onEscape);
        }.bind(this));
        return this.createModal(options);
    }

    /**
     * Create mask and store it inside the class.
     * @returns {HTMLElement}
     */
    createMask() {
        let mask = document.createElement('div');

        mask.classList.add('tk-modal-mask', 'fadein');

        document.body.appendChild(mask);

        //TODO: find a better way to store mask in class
        this.mask = mask;
        return mask;
    }


    /**
     * Create modal and store it inside the class.
     * @param options
     * @returns {HTMLElement}
     */
    createModal(options) {
        let modal = document.createElement('div'),
            modalInner = document.createElement('div'),
            messageNode = document.createElement('div'),
            message = options && options.message || 'Hello there!!!';

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
    }

    /**
     *
     * @param options
     */
    getAlertModal(options) {
        let button = [{
            label: 'Okay', value: null
        }];
        this
            .getModal(options)
            .appendChild(this.getModalButtons(button));
        document.getElementById('modal-button-okay').focus();
    }

    /**
     * Get special type of Modal (Confirm Modal).
     * @param options
     * @param callback
     */
    getConfirmModal(options, callback) {
        let buttons = [
            {label: 'No', value: false},
            {label: 'Yes', value: true}
        ];
        this
            .getModal(options)
            .appendChild(this.getModalButtons(buttons, callback));

        document.getElementById('modal-button-yes').focus();
    }

    /**
     * Get buttons for Confirm Modal.
     * @param buttons
     * @param callback
     * @returns {HTMLElement}
     */
    getModalButtons(buttons, callback = null) {
        let buttonsWrapper = document.createElement('div');

        buttons.forEach(function (button) {
            let that = this,
                newButton = document.createElement('button');

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
    }

    /**
     * Main method to call for Confirm Modal.
     * @param options
     * @param callback
     */
    confirm(options, callback) {
        this.getConfirmModal(options, function (value) {
            typeof callback === "function" && callback(value);
        }.bind(this));
    }

    /**
     * Main method to call for alert Modal.
     * @param options
     */
    alert(options) {
        this.getAlertModal(options);
    }

    /**
     * Destroy Mask and Modal.
     */
    destroyModal() {
        let modal = this.modal,
            mask = this.mask;

        modal.classList.add('close-confirm-modal');
        mask.classList.add('fadeout');

        setTimeout(function () {
            if (this.getModalActive()) {
                modal.parentNode.removeChild(modal);
                mask.parentNode.removeChild(mask);
                this.setModalActive(false);
            }
        }.bind(this), 500);

    }
}