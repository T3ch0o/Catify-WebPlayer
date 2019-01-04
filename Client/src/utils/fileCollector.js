export default function(event) {
    const file = event.target.files[0];

    const formData = new FormData();
    formData.append('file', file);
    this.setState({formData});
}