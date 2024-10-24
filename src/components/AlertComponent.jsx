import Swal from "sweetalert2";

class AlertComponent {
  showAlert({
    icon,
    title,
    message,
    confirmButtonText = "Tutup",
    confirmButtonColor = "red",
    showCancelButton = false,
    cancelButtonText = "Batal",
    cancelButtonColor = "grey",
  }) {
    return Swal.fire({
      icon: icon,
      title: title,
      text: message,
      confirmButtonColor: confirmButtonColor,
      confirmButtonText: confirmButtonText,
      showCancelButton: showCancelButton,
      cancelButtonColor: cancelButtonColor,
      cancelButtonText: cancelButtonText,
    });
  }

  Error(message) {
    this.showAlert({
      icon: "error",
      title: "Pemberitahuan!",
      message: message,
    });
  }

  Warning(message) {
    this.showAlert({
      icon: "warning",
      title: "Pemberitahuan!",
      message: message,
    });
  }

  SuccessLogin(message) {
    this.showAlert({
      icon: "success",
      title: "Selamat Datang",
      message: message,
      confirmButtonColor: "#54FF45",
    });
  }

  SuccessResponse(message) {
    this.showAlert({
      icon: "success",
      title: "Pemberitahuan!",
      message: message,
      confirmButtonColor: "#54FF45",
    });
  }

  DeleteConfirmation(title) {
    return this.showAlert({
      icon: "question",
      title: title,
      message: "Apakah yakin ingin menghapus data?",
      confirmButtonText: "Hapus",
      confirmButtonColor: "grey",
      showCancelButton: true,
      cancelButtonColor: "red",
    });
  }

  ResetConfirmation(title) {
    return this.showAlert({
      icon: "question",
      title: title,
      message: "Apakah yakin ingin mereset data?",
      confirmButtonText: "Reset",
      confirmButtonColor: "grey",
      showCancelButton: true,
      cancelButtonColor: "red",
    });
  }

  LogoutConfirmation(title) {
    return this.showAlert({
      icon: "question",
      title: title,
      message: "Apakah yakin ingin keluar dari sistem?",
      confirmButtonText: "Iya",
      confirmButtonColor: "red",
      showCancelButton: true,
      cancelButtonColor: "grey",
    });
  }
}

export default new AlertComponent();
