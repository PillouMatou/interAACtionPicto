#!/usr/bin/python

import whisper
import sys
from argparse import ArgumentParser, RawTextHelpFormatter

punctuations = '!?\":,/.;()[]'
punc_table = str.maketrans({key: None for key in punctuations})


# usage : python run_whisper.py --model "large-v3.pt" --audio "2670105_230307_194609622.wav"


def process_pred(pred):
    """
        Nettoyer la prédiction du modèle.

        Arguments
        ---------
        pred : string
    """
    ref = pred.replace('- ', ' ').replace(' -', ' ')
    ref = str(ref).translate(punc_table)  # enlever la ponctuation
    process = ref.lower()  # mettre en minuscule
    return process.strip()  # enlever les espaces inutiles


def run_whisper(args):
    """
        Lancer whisper et récupérer la prédiction nettoyée.
    """
    model = whisper.load_model(args.model)  # charger le modèle
    pred = model.transcribe(args.audio, language='fr')["text"]  # récupérer la prédiction du modèle
    out = process_pred(pred)  # nettoyer la prédiction
    sys.stdout.write(out)
    return out


if __name__ == '__main__':
    parser = ArgumentParser(description="Run whisper and get the prediction",
                            formatter_class=RawTextHelpFormatter)
    parser.add_argument('--model', type=str, required=True,
                        help="")
    parser.add_argument('--audio', type=str, required=True,
                        help="")
    parser.set_defaults(func=run_whisper)
    args = parser.parse_args()
    args.func(args)
