import cv2
import os
import torch
from PIL import Image
from io import BytesIO


# global variables 

# strings at index 0 is not used, it
# is to make array indexing simple
one = [ "", "one ", "two ", "three ", "four ",
        "five ", "six ", "seven ", "eight ",
        "nine ", "ten ", "eleven ", "twelve ",
        "thirteen ", "fourteen ", "fifteen ",
        "sixteen ", "seventeen ", "eighteen ",
        "nineteen "];
 
# strings at index 0 and 1 are not used,
# they is to make array indexing simple
ten = [ "", "", "twenty ", "thirty ", "forty ",
        "fifty ", "sixty ", "seventy ", "eighty ",
        "ninety "];

class CurrencyNotesDetection:
    """
    Class implements Yolo5 model to make inferences on a source provided/youtube video using Opencv2.
    """

    def __init__(self, model_name):
        """
        Initializes the class with youtube url and output file.
        :param url: Has to be as youtube URL,on which prediction is made.
        :param out_file: A valid output file name.
        """
        self.model = self.load_model(model_name)
        # similar to coco.names contains ['10Rupees','20Rupees',...]
        self.classes = self.model.names
        self.device = 'cuda' if torch.cuda.is_available() else 'cpu'
        print("Using Device: ", self.device)

    def load_model(self, model_name):
        """
        Loads Yolo5 model from pytorch hub.
        :return: Customed Trained Pytorch model.
        """
        # Custom Model
        # model = torch.hub.load('ultralytics/yolov5', 'custom', path='path/to/best.pt',force_reload=True)  # default
        # model = torch.hub.load('ultralytics/yolov5','custom', path=model_name, force_reload=True, device='cpu')
        # model = torch.hub.load('/home/gowtham/MajorProject/yolov5_custom/yolov5', 'custom', path=model_name, source='local')  # local repo
        model = torch.hub.load('./yolov5', 'custom', path=model_name, source='local')  # local repo
        
        # Yolo Model from Web
        # for file/URI/PIL/cv2/np inputs and NMS
        # model = torch.hub.load('ultralytics/yolov5', 'yolov5s', pretrained=True)

        return model

    def class_to_label(self, x):
        """
        For a given label value, return corresponding string label.
        :param x: numeric label
        :return: corresponding string label
        """
        return self.classes[int(x)]

    def numToWords(self,n, s):
 
        str = ""
        
        # if n is more than 19, divide it
        if (n > 19):
            str += ten[n // 10] + one[n % 10]
        else:
            str += one[n]
    
        # if n is non-zero
        if(n != 0):
            str += s
    
        return str

    def convertToWords(self,n):
        # stores word representation of given
        # number n
        out = ""

        # handles digits at ten millions and
        # hundred millions places (if any)
        out += self.numToWords((n // 10000000),"crore ")

        # handles digits at hundred thousands
        # and one millions places (if any)
        out += self.numToWords(((n // 100000) % 100),"lakh ")

        # handles digits at thousands and tens
        # thousands places (if any)
        out += self.numToWords(((n // 1000) % 100),"thousand ")

        # handles digit at hundreds places (if any)
        out += self.numToWords(((n // 100) % 10),"hundred ")

        if (n > 100 and n % 100):
            out += "and "

        # handles digits at ones and tens
        # places (if any)
        out += self.numToWords((n % 100), "")

        return out

    def get_text(self,labelCnt):
        text = "Image contains"
        noOfLabels,counter = len(labelCnt),0
        for k,v in labelCnt.items():
            text += " {}{} {} ".format(self.convertToWords(v),k,"Notes" if v>1 else "Note")
            if(counter != noOfLabels-1):
                text += 'and'
            counter += 1

        return text


    def get_detected_image(self, img):
        # Images
        imgs = [img]  # batched list of images

        # Inference
        results = self.model(imgs, size=416)  # includes NMS

        # Results
        results.print()  # print results to screen
        # results.show()  # display results
        # results.save()  # save as results1.jpg, results2.jpg... etc. in runs directory
        # print(results)  # models.common.Detections object, used for debugging

        labels, cord = results.xyxyn[0][:, -1], results.xyxyn[0][:, :-1]
        n = len(labels)
        labelCnt = {}
        confidence_scores = {} # Initialize confidence_scores dictionary
        for i in range(n):
            classLabel = self.classes[int(labels[i])]
            row = cord[i]
            # row[4] is conf score
            conf_score = float(row[4]) # Convert to float
            print("{} is detected with {} probability.".format(classLabel, conf_score))
            if classLabel in labelCnt:
                labelCnt[classLabel] += 1
                # If multiple detections for the same class, you might want to average or take max confidence
                # For simplicity, let's update if higher, or just store the last one
                confidence_scores[classLabel] = max(confidence_scores.get(classLabel, 0), conf_score * 100) # Store as percentage
            else:
                labelCnt[classLabel] = 1
                confidence_scores[classLabel] = conf_score * 100 # Store as percentage

        text = self.get_text(labelCnt)
        print("{} This is from yolo_detection.py".format(text))
        # call gTTS (Google Text To Speech)


        # Data (this print is for debugging, you can remove it later)
        print('\n', results.xyxy[0])

        # Transform images with predictions from numpy arrays to base64 encoded images
        # The key change is here: results.render() now returns the rendered images.
        rendered_images = results.render() # updates results.imgs with boxes and labels, returns the rendered images
        
        # Get the first rendered image (assuming you only passed one input image)
        detected_img_array = rendered_images[0] 

        # The app.py expects the image to be a numpy array, which it will then encode to base64.
        # So we return the numpy array directly.
        # You were trying to access results.imgs directly, which is removed in newer versions.
        # results.imgs # This line should be removed or commented out as it caused the error.


        #for testing, display results using opencv (This part is commented out in your code)
        """
        for img_disp in rendered_images: # Use rendered_images here
            cv2.imshow("YoloV5 Detection", cv2.resize(img_disp, (416, 416))[:, :, ::-1])
            cv2.waitKey(0)
            cv2.destroyAllWindows()
        """

        # Return the rendered image (numpy array) and the text
        return detected_img_array, text, labelCnt, confidence_scores # Added labelCnt and confidence_scores





# In yolo_detection.py, around line 192 or where run_model is defined
def run_model(img):
    obj = CurrencyNotesDetection(
        model_name='./yolov5/runs/train/exp/weights/best.pt'
    )
    # Change this line:
    detected_img, detected_labels_text, raw_labels, confidence_scores = obj.get_detected_image(img)
    # And this return:
    return detected_img, detected_labels_text, raw_labels, confidence_scores


