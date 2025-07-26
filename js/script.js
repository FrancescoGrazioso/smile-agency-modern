var open_modal;
function modal(title, body, get = "", size = "", history = true) {
    var modals = $('.modal:visible').length;
    /*
    <div class="modal fade" id="modal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header bg-light">
                    <h5 class="modal-title fw-bold"></h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-4"></div>
            </div>
        </div>
    </div>
     */
    $("body").append('<div class="modal fade" id="modal-' + modals + '" z="' + modals + '" tabindex="-1" aria-hidden="true"> <div class="modal-dialog modal-dialog-centered"> <div class="modal-content"> <div class="modal-header bg-light"> <h5 class="modal-title fw-bold"></h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> </div> <div class="modal-body p-4"></div> </div> </div> </div>');
    $(document).on("hidden.bs.modal", "#modal-" + modals, function () {
        /*QUANDO UN MODAL VIENE CHIUSO LO ELIMINA DALLA PAGINA*/
        $("#modal-" + modals).remove();
    });
    $(document).on("hide.bs.modal", "#modal-" + modals, function () {
        $.ajax
            (
                {
                    type: "GET",
                    url: "php/session_modal.php",
                    data: "",
                    async: true
                }
            );
        /*QUANDO UN MODAL VIENE CHIUSO MOSTRA EVENTUALI MODAL PRECEDENTI NASCOSTI*/
        $(".modal").filter(function () {
            return parseInt($(this).attr("z")) < modals;
        }).show();
    });

    //get --> 1: id element | 2: url 
    $('#modal-' + modals + ' .modal-title').html(title);
    if (size != "")
        $('#modal-' + modals + ' .modal-dialog').removeClass("modal-sm modal-lg modal-xl").addClass(size);
    if (get == "") {
        $('#modal-' + modals + ' .modal-body').html(body);
    } else if (get == 1) {
        $('#modal-' + modals + ' .modal-body').html($("#" + body).html());
    } else if (get == 2) {
        $.ajax
            (
                {
                    type: "GET",
                    url: body,
                    data: "",
                    async: true,
                    success: function (data) {
                        $('#modal-' + modals + ' .modal-body').html(data);
                    }
                }
            );
    }
    if (history) {
        $.ajax
            (
                {
                    type: "GET",
                    url: "php/session_modal.php?title=" + title + "&body=" + body + "&get=" + get + "&size=" + size,
                    data: "",
                    async: true
                }
            );
    }
    /*NASCONDI EVENTUALI MODAL PRECEDENTI*/
    $(".modal").filter(function () {
        return parseInt($(this).attr("z")) < modals;
    }).hide();

    open_modal = new bootstrap.Modal($('#modal-' + modals), { keyboard: false });
    open_modal.show();
}
var clickOrTouch = (('ontouchend' in window)) ? 'tap' : 'click';

/* TOASTS */
function toast(message) {
    /*
    <div class="toast align-items-center" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
            <div class="toast-body"></div>
            <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    </div>
     */
    $(".toast-container").append('<div class="toast align-items-center bg-black shadow" role="alert" aria-live="assertive" aria-atomic="true"> <div class="d-flex"> <div class="toast-body text-white"><b>' + message + '</b></div> <button type="button" class="btn-close btn-close-white me-2 m-auto text-white" data-bs-dismiss="toast" aria-label="Close"></button> </div> </div>');
    $(document).on("hidden.bs.toast", ".toast", function () {
        $(this).remove();
    });
    new bootstrap.Toast($('.toast-container>.toast:last-of-type')).show();
}
/* TOASTS */

$(document).on('submit', 'form', function (e) {
    var form = $(this);
    form.find("button").attr("disabled", true).addClass("disabled");
});

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(
        function () {
            window.alert('Copied to your clipboard')
        }
    );
}
$(document).on("change keyup", "[validate_match]", function () {
    var inputs = [];
    $("[validate_match='" + $(this).attr("validate_match") + "']").each((index, item) => {
        inputs[index] = item.value;
        $(item)[0].setCustomValidity("");
    })
    if (!inputs.every((val, i, arr) => val === arr[0])) {
        $("[validate_match]").last()[0].setCustomValidity("I campi non corrispondono");
    }
});
function shiftPosition(elem, direction, type, id) {
    var item = $(elem).closest(".item");
    var position = item.index();
    $.ajax({
        type: "POST",
        url: "admin/php/shiftPosition.php",
        data: {
            'position': position,
            'direction': direction,
            'type': type,
            'id': id
        },
        async: false,
        success: function (data) {
            if (direction == "right")
                item.before(item.next());
            else
                item.after(item.prev());
        }
    });
}