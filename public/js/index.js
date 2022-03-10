document.addEventListener('DOMContentLoaded', () => {
    function onClickPasswordToggle(event) {
      const button = event.currentTarget;
      const input = button.previousElementSibling;
      const icon = button.querySelector('i');
  
      if (input.type === 'text') {
        input.type = 'password';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
      } else {
        input.type = 'text';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
      }
    }
    // function onClickStar(event){
    //   const button = event.currentTarget
    //   const input = button.previousElementSibling 
    //   const icon = button.querySelector('i');
      
    //   if (input.type === 'radio') {
    //     input.type = 'star';
    //     icon.classList.remove('fa-star');
    //     icon.classList.add('fa-star-slash');
    //   } else {
    //     input.type = 'radio';
    //     icon.classList.remove('fa-star-slash');
    //     icon.classList.add('fa-star');
    //   }

    // }
  
    document.querySelectorAll('.password-toggle')
      .forEach(button => button.addEventListener('click', onClickPasswordToggle));
    // document.querySelectorAll('.star-toggle')
    //   .forEach(button => button.addEventListener('click', onClickStar));
  })
  